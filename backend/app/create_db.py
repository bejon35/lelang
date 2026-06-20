from app.database import engine
from app.models.barang import Barang

Base = Barang.metadata

Base.create_all(
    bind=engine
)

print("Tabel berhasil dibuat")