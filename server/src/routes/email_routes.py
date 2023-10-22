from fastapi import FastAPI, APIRouter
import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from pydantic import BaseModel

router = APIRouter()

class EmailRequest(BaseModel):
    body: str
    recipient: str

@router.post("/send_email")
def send_email(request: EmailRequest):

    msg = MIMEText(request.body)
    msg['Subject'] = "Your Text Insights Summary"
    #recipient = input(str("Please enter the email you would like to send the summary to: "))
    msg['From'] = "textinsights@gmail.com"
    msg['To'] = request.recipient
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login("textinsights@gmail.com", "lgoi fdyt jvin auaj")
       smtp_server.sendmail("textinsights@gmail.com", request.recipient, msg.as_string())
    print("Message sent!")
