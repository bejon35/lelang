import pandas as pd
from sqlalchemy import create_engine

# Koneksi PostgreSQL
engine = create_engine(
    "postgresql+psycopg2://postgres:admin123@localhost:5432/makanan"
)

# Baca CSV
df = pd.read_csv("dataset_bersih.csv")

# Ganti nama kolom agar cocok dengan PostgreSQL
df.columns = [
    "kategori_indikator",
    "sub_indikator",
    "satuan",
    "tahun_2020",
    "tahun_2021",
    "tahun_2022",
    "tahun_2023",
    "tahun_2024"
]

# Upload ke PostgreSQL
df.to_sql(
    name="dataset_pertanian",
    con=engine,
    if_exists="append",   # tambah data
    index=False
)

print("Data berhasil diupload!")