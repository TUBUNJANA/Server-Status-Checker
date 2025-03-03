import psycopg2
from psycopg2.extras import DictCursor

# PostgreSQL Database Configuration
DB_CONFIG = {
    "dbname": "server_status_db",
    "user": "server_admin",
    "password": "721457",
    "host": "::1",
    "port": "5432"
}

def get_db_connection():
    """Establish a connection to PostgreSQL."""
    conn = psycopg2.connect(**DB_CONFIG, cursor_factory=DictCursor)
    return conn

def init_db():
    """Initialize database and create tables if they don't exist."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS servers (
                id SERIAL PRIMARY KEY,
                url TEXT UNIQUE NOT NULL
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS status_logs (
                id SERIAL PRIMARY KEY,
                url TEXT,
                status TEXT,
                response_time FLOAT,
                checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()

# Initialize DB on first run
init_db()
