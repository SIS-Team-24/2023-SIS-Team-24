from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services import sentiment_service

router = APIRouter()

class InputData(BaseModel):
    text: str

@router.post("/process")
def analyze_sentiment(input_data: InputData):
    """
    Analyze sentiment for user-provided text.
    """
    text = input_data.text
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")
    
    try:
        sentiment = sentiment_service.get_sentiment(text)
        return {"sentiment": sentiment}
    except Exception as e:
        return HTTPException(status_code=500, detail="Server error: " + str(e))

@router.get("/process")
def _():
    return {"message": "You need to post to this endpoint, not get!"}