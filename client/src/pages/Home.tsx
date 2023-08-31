import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { addToHistory, clearHistory, postRequestOptions, retrieveHistory } from "../components/Utils";

function Home(this: any) {
  const [someState, setSomeState] = useState("not set");
  const [textInput, setTextInput] = useState("Placeholder");
  const [testTextInput, setTestTextInput] = useState("Insert text here to test analysis storage function");

  useEffect(() => {
    console.log(`useEffect placeholder... initial state: ${someState}`);
    setSomeState("some state");
    console.log(`After state change: ${someState}`);
  }, [someState]);

  // Testing function to call Summary analysis fn...
  const getSummary = () => {
    const body = JSON.stringify({ text: "testing summary/process ..." });
    fetch("/api/summary/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.summary) {
          setTextInput("Summary API call was successful.");
        } else {
          setTextInput("Call to /api/summary/process failed.");
        }
      });
  };

  // Testing function to call Sentiment analysis fn...
  const getSentiment = () => {
    const body = JSON.stringify({ text: "testing sentiment/process ..." });
    fetch("/api/sentiment/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.sentiment) {
          setTextInput("Sentiment API call was successful.");
        } else {
          setTextInput("Call to /api/sentiment/process failed.");
        }
      });
  };

  // Test function for capturing text for testing storage function...
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestTextInput(event.target.value);
  };

  // Example of how to use addToHistory() - Summary only...
  const testStoringToHistory = () => {
    // param type = AnalysisInput (refer to Utils.tsx)
    addToHistory({ summary: testTextInput });
  };

  // Example of how to use retrieveHistory()...
  const getAnalysisHistory = () => {
    const historyArr = retrieveHistory();
    // Do some formatting...
    setTextInput(JSON.stringify(historyArr));
  };

  return (
    <>
      <h1 className="mt-48 font-extrabold">
        <p className="flex items-center justify-center space-x-4 text-3xl">Hello SIS-team-24</p>
      </h1>
      <h2 className="flex items-center justify-center space-x-4 text-xl font-bold underline decoration-violet-400 underline-offset-8 ">
        NLP-app
      </h2>
      <div className="flex justify-center gap-5 p-10">
        <Button variant="active" onClick={getSummary}>
          Summary Test
        </Button>
        <Button variant="active" onClick={getSentiment}>
          Sentiment Test
        </Button>
      </div>
      <div className="flex justify-center gap-5 p-10">
        <textarea value={testTextInput} onChange={(value) => handleChange(value)} className="w-100" />
        <Button variant="active" onClick={testStoringToHistory}>
          Store text into history
        </Button>
        <Button variant="active" onClick={getAnalysisHistory}>
          Retrieve History
        </Button>
        <Button
          variant="active"
          onClick={() => {
            // Example of to clear history and show some kind of message to user...
            clearHistory();
            setTextInput("History Cleared.");
          }}
        >
          Clear History
        </Button>
      </div>
      {textInput && <p className="flex justify-center">{textInput}</p>}
    </>
  );
}

export default Home;
