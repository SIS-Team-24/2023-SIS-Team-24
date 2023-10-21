import { exec } from "child_process";

const executeButton = document.getElementById("executeButton");

const sendEmail = async () => {
  const recipient = "kieren.karanjia@gmail.com";
  await fetch("/api/email/send_email");
};

export default sendEmail;
