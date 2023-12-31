from fastapi import APIRouter, HTTPException
from ..model.data_model import InputData
from ..services import sentiment_service

router = APIRouter()

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
        # return object {"sentiment": str, "score": float, "emotion": str[]}
        return sentiment
    except Exception as e:
        # Whenever the backend sends a server error, frontend should render an appropriate error message.
        return HTTPException(status_code=500, detail="Server error: " + str(e))

@router.get("/process")
def _():
    return {"message": "You need to post to this endpoint, not get!"}