from pydantic import BaseModel
from enum import Enum

# Defined analysis kinds for type safety
class SummaryLengthOption(Enum):
    SHORT = "short"
    DEFAULT = "default"
    LONG = "long"

class InputData(BaseModel):
    text: str

class SummaryInputData(InputData):
    summary_len_option: SummaryLengthOption # Value should either be "default", "short", or "long"