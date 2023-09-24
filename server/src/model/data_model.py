from pydantic import BaseModel

class InputData(BaseModel):
    text: str
    summary_len_option: str # Value should either be "default", "short", or "long"