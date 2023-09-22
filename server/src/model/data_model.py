from pydantic import BaseModel

class InputData(BaseModel):
    text: str
    custom_len: int