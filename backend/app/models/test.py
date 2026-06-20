import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="makanan",
    user="postgres",
    password="admin123"
)

cursor = conn.cursor()

cursor.execute(
    "SELECT current_database();"
)

print(cursor.fetchone())