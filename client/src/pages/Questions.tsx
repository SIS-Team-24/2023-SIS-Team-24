import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import NavigationBar from "./NavigationBar";

function Questions() {
  const questions = [
    {
      q: "What is Text Insights?",
      a: "Text Insights is an online text summariser application that provides users with concise summaries of longer text documents. Additionally, it offers sentiment analysis to determine whether the text is positive, negative, or neutral, along with a percentage score.",
    },
    {
      q: "How does Text Insights summarise text?",
      a: "Text Insights uses the powerful BERT (Bidirectional Encoder Representations from Transformers) model for text summarisation. BERT's advanced natural language understanding capabilities help identify key sentences and phrases, allowing it to create coherent and accurate summaries.",
    },
    {
      q: "What is sentiment analysis, and why is it important?",
      a: "Sentiment analysis is the process of determining the emotional tone of a piece of text, whether it's positive, negative, or neutral. It's important because it helps users quickly gauge the overall sentiment of a document, which can be useful for making informed decisions or understanding public opinion.",
    },
    {
      q: "How accurate is Text Insights' sentiment analysis using BERT?",
      a: "Text Insights utilises BERT-based sentiment analysis models, known for their high accuracy in understanding the emotional tone of text. While no sentiment analysis tool is perfect, BERT enhances accuracy by capturing context and nuances effectively.",
    },
    {
      q: "Can Text Insights summarise any type of text?",
      a: "Text Insights can summarise a wide range of text types, including articles, reports, essays, news articles, and more. It works best with well-structured text, but it can handle various formats.",
    },
    {
      q: "What is the maximum length of the summary generated by Text Insights?",
      a: "The maximum summary length generated by Text Insights is set at 400 words. This ensures that the summary remains concise while capturing the most important information from the original text.",
    },
  ];

  return (
    <div className="mt-10">
      <NavigationBar />
      <div className="mt-20 font-extrabold">
        <span className="mb-10 font-bold text-2xl flex flex-col items-center justify-center mt-10">
          Frequently Asked Questions
        </span>
        <div className="font-normal flex flex-col items-center justify-center ">
          {questions.map((question, index) => (
            <Accordion
              key={index}
              className="items-center content-center w-2/5"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panella-content-${index}`}
              >
                <Typography>
                  <h2 className="faq-question font-semibold">{question.q}</h2>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-answer font-normal">
                  <h2>{question.a}</h2>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Questions;
