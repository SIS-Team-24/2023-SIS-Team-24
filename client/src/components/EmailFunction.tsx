import { postRequestOptions } from "./Utils";

const sendEmail = async (
  body: string | undefined,
  recipient: string | undefined
) => {
  try {
    const response = await fetch("/api/email/send_email", {
      ...postRequestOptions,
      body: JSON.stringify({
        body: body,
        recipient: recipient,
      }),
    });

    if (response.ok) {
      // Successful email send (200 OK)
      alert("Email Sent!");
    } else if (response.status === 455) {
      // Invalid email or missing email body (400 Bad Request)
      alert(
        "It seems the email you have entered is not valid or you haven't entered an email body. Please check and try again."
      );
    } else if (response.status === 500) {
      // SMTP error (500 Internal Server Error)
      alert(
        "There was an error while sending the email. Please try again later."
      );
    } else {
      // Handle other status codes as needed
      alert("An unexpected error occurred.");
    }
  } catch (error: any) {
    // Handle network errors or other exceptions
    alert("An error occurred: " + error.message);
  }
};
export default sendEmail;
