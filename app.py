from flask import Flask, request, jsonify
import requests
import threading
import time
from database import get_db_connection
from flask_cors import CORS


app = Flask(__name__)

# Allow CORS only from http://localhost:5173/
CORS(app)

# Log every request's URL and its origin
@app.before_request
def log_request_info():
    print(f"Request URL: {request.url}")
    print(f"Request Origin: {request.headers.get('Origin')}")

# Function to check server status
def check_server(url):
    try:
        start_time = time.time()
        response = requests.get(url, timeout=5)
        response_time = round(time.time() - start_time, 2)

        status = "UP" if response.status_code == 200 else f"WARNING ({response.status_code})"
    except requests.RequestException:
        print("RequestException Error")
        status = "DOWN"
        response_time = None

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO status_logs (url, status, response_time) VALUES (%s, %s, %s)",
            (url, status, response_time)
        )
        conn.commit()

    return {"url": url, "status": status, "response_time": response_time}

# Periodic server checking
def monitor_servers():
    while True:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT url FROM servers")
            urls = [row["url"] for row in cursor.fetchall()]

        for url in urls:
            check_server(url)

        print("🔍 Servers checked. Waiting for next cycle...")
        time.sleep(30)

# API to add a new server URL
@app.route("/add_server", methods=["POST"])
def add_server():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO servers (url) VALUES (%s)", (url,))
            conn.commit()
        except psycopg2.IntegrityError:
            return jsonify({"error": "Server already exists"}), 400

    return jsonify({"message": "Server added successfully"})

# API to get status logs
@app.route("/logs", methods=["GET"])
def get_logs():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM status_logs ORDER BY checked_at DESC LIMIT 100")
        logs = cursor.fetchall()

    return jsonify([
        {"id": log["id"], "url": log["url"], "status": log["status"],
         "response_time": log["response_time"], "checked_at": log["checked_at"]}
        for log in logs
    ])

# API to delete a server URL
@app.route("/delete_server", methods=["DELETE"])
def delete_server():
    """Delete a server URL from the database."""
    data = request.json
    url = data.get("url")
    print("Delete server called with url: ", url)

    if not url:
        return jsonify({"error": "URL is required"}), 400

    with get_db_connection() as conn:
        cursor = conn.cursor()
        print("Inside the server deletion")
        # Check if the URL exists
        cursor.execute("SELECT * FROM servers WHERE url = %s", (url,))
        if cursor.fetchone() is None:
            print("Server not")
            return jsonify({"error": "Server not found"}), 404
        print("Server found")
        # Delete the server from the servers table
        cursor.execute("DELETE FROM servers WHERE url = %s", (url,))
        conn.commit()

    return jsonify({"message": f"Server {url} deleted successfully"})

if __name__ == "__main__":
    threading.Thread(target=monitor_servers, daemon=True).start()
    app.run(debug=True, port=5000)
