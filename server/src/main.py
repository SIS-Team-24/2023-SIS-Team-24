from fastapi import FastAPI
from dotenv import load_dotenv
from .routes import summary_routes, sentiment_routes
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

@app.get("/api")
def read_root():
    return {"message": "⚡️⚡️⚡️ FastAPI + Python 3 Server! ⚡️⚡️⚡️"}


# Webhook to update server whenever git remote updates.
@app.post("/api/update")
def update_server():
    try:
        # Step 1: Pull the latest code from the Git repository
        pull_command = "git pull origin main"
        subprocess.check_output(pull_command, shell=True)

        # Step 2: Reload the server using Uvicorn
        reload_command = "uvicorn server.src.main:app --host 0.0.0.0 --port 4200 --reload"
        subprocess.Popen(reload_command, shell=True)

        return {"message": "Server code updated and reloading initiated."}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    load_env()
    uvicorn.run('main:app', host="0.0.0.0", port=int(os.environ.get('PORT', 8000)), reload=True)
