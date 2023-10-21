from fastapi import FastAPI, APIRouter
import smtplib
from email.message import EmailMessage
from ..services import email_function
from email.mime.text import MIMEText

router = APIRouter()

@router.get("/send_email")
def send_email():
    msg = MIMEText("Test Summary")
    msg['Subject'] = "Your Text Insights Summary"
    #recipient = input(str("Please enter the email you would like to send the summary to: "))
    msg['From'] = "textinsights@gmail.com"
    msg['To'] = "kieren.karanjia@gmail.com"
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login("textinsights@gmail.com", "lgoi fdyt jvin auaj")
       smtp_server.sendmail("textinsights@gmail.com", "kieren.karanjia@gmail.com", msg.as_string())
    print("Message sent!")