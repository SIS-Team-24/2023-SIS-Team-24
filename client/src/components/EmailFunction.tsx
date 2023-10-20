import { exec } from "child_process";

const executeButton = document.getElementById("executeButton");

function sendEmail() {
  // Define the Python script to run
  const pythonScriptPath = "./email_function.py";

  // Execute the Python script as a child process
  exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Python Script Output: ${stdout}`);
  });
}

export default sendEmail;
