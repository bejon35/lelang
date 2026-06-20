from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from app.database import Base

class Barang(Base):

    __tablename__ = "barang"

    id = Column(
        Integer,
        primary_key=True
    )

    nama_barang = Column(
        String(100)
    )

    harga_awal = Column(
        Float
    )