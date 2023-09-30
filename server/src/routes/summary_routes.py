from fastapi import APIRouter, HTTPException
from ..model.data_model import SummaryInputData
from ..services import summary_service

router = APIRouter()

@router.post("/process")
def process_text(input_data: SummaryInputData):
    """
    Process user-provided text and return a summary.
    """
    text = input_data.text
    summary_len_option = input_data.summary_len_option
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")
    if not summary_len_option:
        raise HTTPException(status_code=400, detail="summary_len_option is required. The value is either 'short', 'long', or 'default'")
    try:
        summary = summary_service.get_summary(text, summary_len_option)
        return {"summary": summary}
    except Exception as e:
        # Whenever the backend sends a server error, frontend should render an appropriate error message.
        return HTTPException(status_code=500, detail="Server error: " + str(e))

@router.get("/process")
def _():
    return {"message": "You need to post to this endpoint, not get!"}