from fastapi import APIRouter, HTTPException
from ..model.data_model import InputData
from ..services import summary_service

router = APIRouter()

@router.post("/process")
def process_text(input_data: InputData):
    """
    Process user-provided text and return a summary.
    """
    text = input_data.text
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")
    
    try:
        summary = summary_service.get_summary(text)
        return {"summary": summary}
    except Exception as e:
        # Whenever the backend sends a server error, frontend should render an appropriate error message.
        return HTTPException(status_code=500, detail="Server error: " + str(e))

@router.get("/process")
def _():
    return {"message": "You need to post to this endpoint, not get!"}