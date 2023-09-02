import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const questions = [
  {
    q: "Do you hate c++?",
    a: "of course.",
  },
  {
    q: "Do you hate c++?",
    a: "yes.",
  },
  {
    q: "Do you hate c++?",
    a: "absolutely.",
  },
];

function FAQ() {
  return (
    <div className="font-normal flex flex-col items-center justify-center ">
      {questions.map((question, index) => (
        <Accordion key={index} className="items-center content-center w-2/5">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panella-content-${index}`}
          >
            <Typography>
              <h2>{question.q}</h2>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="font-normal">
              <h2>{question.a}</h2>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default FAQ;
