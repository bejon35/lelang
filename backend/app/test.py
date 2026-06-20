import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="makanan",
    user="postgres",
    password="admin123"
)

cur = conn.cursor()

cur.execute("""
SELECT column_name
FROM information_schema.columns
WHERE table_name='barang'
ORDER BY ordinal_position
""")

for row in cur.fetchall():
    print(row)

cur.close()
conn.close()