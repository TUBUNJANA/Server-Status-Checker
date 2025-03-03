import streamlit as st
import requests
import pandas as pd

API_URL = "http://127.0.0.1:5000"

st.title("🔍 Server Status Checker")

# Sidebar - Add new server URL
st.sidebar.header("➕ Add New Server")
new_url = st.sidebar.text_input("Enter server URL:")
if st.sidebar.button("Add Server"):
    if new_url:
        response = requests.post(f"{API_URL}/add_server", json={"url": new_url})
        st.sidebar.write(response.json().get("message", "Error adding server"))
        st.experimental_rerun()  # Refresh the page after adding a server
    else:
        st.sidebar.warning("Please enter a URL to add.")

# Sidebar - Delete server URL
st.sidebar.header("🗑️ Delete Server")
servers_response = requests.get(f"{API_URL}/logs").json()
server_list = list(set([log["url"] for log in servers_response])) if servers_response else []

if server_list:
    delete_url = st.sidebar.selectbox("Select server to delete:", server_list)
    if st.sidebar.button("Delete Server"):
        delete_response = requests.delete(f"{API_URL}/delete_server", json={"url": delete_url})
        st.sidebar.write(delete_response.json().get("message", "Error deleting server"))
        st.experimental_rerun()  # Refresh the page after deleting a server
else:
    st.sidebar.write("No servers available to delete.")

# Fetch and display server logs
st.subheader("📊 Server Status Logs")
logs = requests.get(f"{API_URL}/logs").json()
df = pd.DataFrame(logs)

if not df.empty:
    df["checked_at"] = pd.to_datetime(df["checked_at"])

    # Display Data Table
    st.write(df)

    # Group data by URL and plot separate charts
    st.subheader("📈 Server Performance (Individual Graphs)")

    for url in df["url"].unique():
        st.subheader(f"📊 Response Time for {url}")
        df_url = df[df["url"] == url].sort_values("checked_at")  # Sort for proper plotting

        if df_url["response_time"].isna().all():
            st.write("No response time data available for this server.")
        else:
            st.line_chart(df_url.set_index("checked_at")["response_time"])
else:
    st.write("No logs available.")
