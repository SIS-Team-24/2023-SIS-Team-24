from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from .routes import summary_routes, sentiment_routes, scraper_router
from .services import summary_service, sentiment_service
import os
import subprocess

def load_env():
    # Get the directory where main.py is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Load environment variables from .env file
    load_dotenv(os.path.join(script_dir, '..', '..', '.env'))

app = FastAPI()

@app.on_event("startup")
async def load_models():
    summary_service.load_model()
    sentiment_service.load_model()


# Define routes for the API
app.include_router(summary_routes.router, prefix="/api/summary")
app.include_router(sentiment_routes.router, prefix="/api/sentiment")
app.include_router(scraper_router.router, prefix="/api/scraper")

@app.get("/api")
def read_root():
    return {"message": "⚡️⚡️⚡️ FastAPI + Python 3 Server! ⚡️⚡️⚡️"}


# Webhook to update server whenever git remote updates.
@app.post("/api/update")
def update_server():
    try:
        remote = "https://github.com/SIS-Team-24/2023-SIS-Team-24.git"
        pull_command = f"git pull {remote}"
        update_deps_command = "pip install -r server/requirements.txt"
        subprocess.check_output(pull_command, shell=True)
        subprocess.check_output(update_deps_command, shell=True)
        
        return { "message": "Server code updated and reloading initiated."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error: " + str(e))

if __name__ == "__main__":
    import uvicorn
    load_env()
    uvicorn.run('main:app', host="0.0.0.0", port=int(os.environ.get('PORT', 8000)), reload=True)
