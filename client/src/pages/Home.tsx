import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { addToHistory, clearHistory, postRequestOptions, retrieveHistory } from "../components/Utils";
import logo from "../images/logo.png";
import summariseButton from "../images/SummariseButton.png";
import copyButton from "../images/copyButton.png";
import { DividerHorizontal } from "../components/DividerHorizontal";



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
      <div>
      <img
        src={logo}
        alt="logo"
        style={{
          position: "absolute",
          top: 25,
          left: 70,
          width: "550px", 
          height: "100px", 
        }}
      />
        <p className="flex items-center justify-start space-x-4 text-3xl"  style={{marginLeft: '80px'}}>  Sentiment analysis of the text is:
  <span
    style={{
      
      color: 'lightgreen',
      paddingLeft: '8px', 
    }}
  >
    Positive </span></p>

        <DividerHorizontal className="divider-horizontal" />
        
        <div className="flex justify-center gap-5 p-10">
        {/* Left text box */}
        <div className="text-box"style={{ position: 'relative' }}>
          <textarea
            value={testTextInput}
            onChange={(event) => handleChange(event)}
            className="w-100"
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              padding: "10px",
              width: "547px", 
              height: "568px",
            }}
          />

          <img
              src={summariseButton}
              alt="Button"
              style={{
                position: "absolute",
                top: "580px",
                right: "1px",
                width: "135px", 
                height: "45px", 
                cursor: "pointer", 
              }}
              onClick={getSummary} 
              // => {
              //   // Handle button click action here
              //   alert("Button Clicked!");
              // }}
            />
        </div>

        {/* Right text box */}
        <div className="text-box">
          <textarea
            value={testTextInput}
            onChange={(event) => handleChange(event)}
            className="w-100"
            style={{
              backgroundColor: "#f8f9fa",
              border: "2px solid black",
              padding: "10px",
              width: "547px",  
              height: "568px",
            }}
          />
          <img
              src={copyButton}
              alt="Button"
              style={{
                position: "absolute",
                bottom: "830px",
                right: "280px",
                width: "51px", 
                height: "56px", 
                cursor: "pointer", 
              }}
              onClick={getSummary} 
              // => {
              //   // Handle button click action here
              //   alert("Button Clicked!");
              // }}
            />
        </div>
      </div>

      {textInput && <p className="flex justify-center">{textInput}</p> }
    
      <div className="flex justify-center gap-5 p-10"   style={{
             marginRight: "820px",
            }}>
        <Button variant="active" onClick={getAnalysisHistory}>
          History
        </Button>
        <Button variant="active" onClick={getSentiment}>
          Learning Summary
        </Button>
      </div>

            <br></br>
       <p className="flex items-center justify-center space-x-4 text-3xl">Hello SIS-team-24</p>
      </div>
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