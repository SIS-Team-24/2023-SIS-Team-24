import React from "react";
import NavigationBar from "./NavigationBar";

function About(this: any) {
  return (
    <div className="mt-10">
      <NavigationBar />

      <p className="flex items-center items-baseline justify-start space-x-4 text-xs ml-60">
        Text Insights is your go-to solution for harnessing the power of Natural
        Language Processing (NLP). Our product empowers users to effortlessly
        summarise and analyse text content, providing invaluable insights.
        Whether you're a student grappling with voluminous textbooks, an
        educator seeking efficient content evaluation, or a professional
        navigating the digital landscape, Text Insights has you covered. We
        prioritise simplicity, customisation, and accuracy, making complex tasks
        a breeze. Powered by open-source models, our tool offers an ethical and
        transparent approach to text processing. With Text Insights, you unlock
        a world of concise understanding and sentiment analysis, enriching your
        text-related endeavours.
      </p>
    </div>
  );
}

export default About;
