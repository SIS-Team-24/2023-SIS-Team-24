import { postRequestOptions } from "./Utils";

const sendEmail = async (
  body: string | undefined,
  recipient: string | undefined
) => {
  await fetch("/api/email/send_email", {
    ...postRequestOptions,
    body: JSON.stringify({
      body: body,
      recipient: recipient,
    }),
  });
};

export default sendEmail;
