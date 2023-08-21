from fastapi import APIRouter, HTTPException, Depends
from services import summary_service

router = APIRouter()

@router.post("/process")
def process_text(input_data: dict, summarize=Depends(summary_service.generate_summary)):
    """
    Process user-provided text and return a summary.
    """
    text = input_data.get('text')
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")
    
    summary = summarize(text)
    return {"summary": summary}

@router.get("/process")
def _():
    return {"message": "You need to post to this endpoint, not get!"}