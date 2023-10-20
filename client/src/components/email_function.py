import smtplib
from email.mime.text import MIMEText

subject = "Your Text Insights Summary"
body = "This is the body of the text message"
sender = "textinsights@gmail.com"
recipient = ""
password = "SoftInnoStudio2023%"


def send_email(subject, body, sender, recipient, password):
    msg = MIMEText(body)
    msg['Subject'] = subject
    recipient = input(str("Please enter the email you would like to send the summary to: "))
    msg['From'] = sender
    msg['To'] = recipient
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login(sender, password)
       smtp_server.sendmail(sender, recipient, msg.as_string())
    print("Message sent!")


send_email(subject, body, sender, recipient, password)