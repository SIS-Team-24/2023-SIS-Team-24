Research Feature: Text Insights Email Integration

For Text Insights, a new feature will be built in the next Sprint that allows the user to share their summary output as an email. This function will need to bridge the gap between our TypeScript and Python components, and as such I have researched this topic and included the necessary steps and components to setting this feature up.

**Install the necessary python packages in repository**

For this initial section, the following packages will need to be installed in the repository through the following pip command:

_pip install smtplib email_

This will install both the smtplib (for Simple Mail Transfer Protocol functionality) and email (for formatting and creating the content of the email) library.

**Set up Gmail account to send emails from**

Emails always need to have a sender, and Gmail provides tools to allow your email to send outbound messages. To do this, go to the “Settings” section of a Google Account, navigate to “Security” and then click on the “2-Factor Authentication” section. From here, go to “App Password” and generate a password. This password when used with the python library will allow your email to verify itself to send outbound emails.

**Create Code and functionality within repo**

The next stage will be actually creating the code and functionality within the Text Insights repo.

Right now, it is agreed that the sharing feature will be a button attached to each summary history summary output that allows the user to click on the “Share” button to then receive an inbound email from Text Insights.

Not including the button (as the setup for that will be quite simple), and based on my research, the actual email function will look something like this:

import smtplib
from email.mime.text import MIMEText

subject = "Email Subject"
body = "This is the body of the text message"
sender = "sender@gmail.com"
recipients = ["recipient1@gmail.com", "recipient2@gmail.com"]
password = "password"

def send_email(subject, body, sender, recipients, password):
msg = MIMEText(body)
msg['Subject'] = subject
msg['From'] = sender
msg['To'] = ', '.join(recipients)
with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
smtp_server.login(sender, password)
smtp_server.sendmail(sender, recipients, msg.as_string())
print("Message sent!")

send_email(subject, body, sender, recipients, password)

Once this is all implemented, users should be able to freely email themselves summaries!

Email: textinsights@gmail.com
PW: SoftInnoStudio2023%
App Password: lgoi fdyt jvin auaj
