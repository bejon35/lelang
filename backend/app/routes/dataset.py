# app/routes/dataset.py

from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine

router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)

@router.get("/")
def get_dataset():

    with engine.connect() as conn:

        result = conn.execute(
            text(
                "SELECT * FROM dataset_pertanian"
            )
        )

        return [
            dict(row._mapping)
            for row in result
        ]