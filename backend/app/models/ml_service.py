import joblib
import pandas as pd

model = joblib.load("model_pertanian.pkl")


def predict(data):

    df = pd.DataFrame([data])

    hasil = model.predict(df)

    return float(hasil[0])