from fastapi import FastAPI
from app.routes.dataset import router as dataset_router

app = FastAPI()

app.include_router(
    dataset_router
)