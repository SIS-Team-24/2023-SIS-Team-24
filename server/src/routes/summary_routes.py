from fastapi import APIRouter, HTTPException, Depends
from services import summary_service

router = APIRouter()

@router.post("/process")
def process_text(input_data: dict, get_summary=Depends(summary_service.generate_summary)):
    """
    Process user-provided text and return a summary.
    """
    text = input_data.get('text')
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")
    
    try:
        summary = get_summary(text)
        return {"summary": summary}
    except Exception as e:
        return HTTPException(status_code=500, detail="Server error: " + str(e))

@router.get("/process")
def _():
    return {"message": "You need to post to this endpoint, not get!"}