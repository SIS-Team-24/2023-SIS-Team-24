import React from "react";
import NavigationBar from "./NavigationBar";

function About(this: any) {
  return (
    <div>
      <NavigationBar />
      <hr className="h-px mt-2 border-0 bg-gray-300"></hr>
      <div className="mx-auto max-w-2xl p-4 mt-10 text-center"> 
        <h1 className="text-3xl font-extrabold">About</h1> 
        <p className="mt-4 text-sm font-bold">
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
        
        <div className="mt-8">
          <h2 className="text-xl font-bold">Key Features</h2>
          <ul className="mt-2 text-left list-disc list-inside">
            <li>Automatic text summarisation</li>
            <li>Sentiment analysis</li>
            <li>Emotion analysis</li>
            <li>Customisable text fonts</li>
            <li>Adjustable summary length (Short, Medium, Long)</li>
            <li>
              
              User-friendly interface
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">How Text Insights Can Help You</h2>
          <p className="mt-2">
            Imagine easily condensing lengthy documents into concise summaries for quick understanding. Whether you're a student preparing for exams, an educator evaluating coursework or a professional analysing reports, Text Insights streamlines your workflow.
          </p>
        </div>

        
        <div className="mt-10 text-center" >
          <button style={{
                backgroundColor: "#2e7faa",
               
              }} 
              className="mt-8 py-2 px-4 text-white rounded">
            <a href="/">Try Text Insights</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
