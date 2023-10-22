const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

async function readPdf(pdfFilePath) {
  try {
    // Read the PDF file
    const pdfBuffer = fs.readFileSync(pdfFilePath);

    // Parse the PDF into text
    const data = await pdf(pdfBuffer);

    // Extract and return the text content
    const text = data.text;
    return text;
  } catch (error) {
    console.error("Error parsing the PDF:", error);
    throw error;
  }
}

module.exports = { readPdf };
