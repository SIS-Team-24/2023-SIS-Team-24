from fastapi import FastAPI
from dotenv import load_dotenv
import os


def load_env():
    # Get the directory where main.py is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Load environment variables from .env file
    load_dotenv(os.path.join(script_dir, '..', '..', '.env'))

app = FastAPI()

@app.get("/api")
def read_root():
    return {"message": "⚡️⚡️⚡️ FastAPI + Python 3 Server! ⚡️⚡️⚡️"}

@app.get("/")
def catch_all():
    return {"message": "Welcome to the FastAPI server! This endpoint is undefined. Visit /api"}

if __name__ == "__main__":
    import uvicorn
    load_env()
    uvicorn.run('main:app', host="0.0.0.0", port=int(os.environ.get('PORT', 8000)), reload=True)
