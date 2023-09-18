import React from "react";
import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import {
  addToHistory,
  clearHistory,
  postRequestOptions,
  retrieveHistory,
} from "../components/Utils";

function Home(this: any) {
  const [someState, setSomeState] = useState("not set");
  const [textInput, setTextInput] = useState("not set");
  const [inputValue, setInputValue] = useState<string>("");
  const [sentimentText, setSentimentText] = useState("Neutral"); // "Positive", "Neutral", or "Negative"
  const [sentimentScore, setSentimentScore] = useState(0); // Decimal value e.g. 0.97 for 97%
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [emotionLabel, setEmotionLabel] = useState("Not set"); // "Happy", "Sad", "angry"
  const [submitted, setSubmitted] = useState(false);

  const setSentimentStyle = () => {
    switch (sentimentText) {
      case "Positive":
        return {
          color: "lightgreen",
          paddingLeft: "8px",
        };
      case "Negative":
        return {
          color: "red",
          paddingLeft: "8px",
        };
      default:
        return {
          color: "black",
          paddingLeft: "8px",
        };
    }
  };

  // The background colour can change to a coloured border or a button-like design.
  const setEmotionStyle = () => {
    switch (emotionLabel) {
      case "Happy":
        return {
          backgroundColor: "lightgreen",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      case "Sad":
        return {
          backgroundColor: "yellow",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      case "Angry":
        return {
          backgroundColor: "red",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      case "Upset":
        return {
          backgroundColor: "grey",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      default:
        return {
          backgroundColor: "white",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
    }
  };

  const inputStyles = {
    fontFamily: selectedFont || "Open Sans",
    backgroundColor: "white",
    border: "2px solid black",
    padding: "10px",
    width: "547px",
    height: "568px",
  };

  useEffect(() => {
    console.log(`useEffect placeholder... initial state: ${someState}`);
    setSomeState("some state");
    console.log(`After state change: ${someState}`);
  }, [someState]);

  // Event handler for input value change
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value); // Update the input value in the state
  };

  const handleFontClick = (selectedFont: string) => {
    console.log("new font: font-" + selectedFont);
    setSelectedFont(selectedFont);
  };

  // Testing function to call Summary analysis fn...
  const getSummary = async () => {
    setSubmitted(true);
    console.log("submitted: " + submitted);
    const body = JSON.stringify({ text: inputValue });
    await fetch("/api/summary/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.summary) {
          setTextInput(data.summary);
          addToHistory({ summary: data.summary });
        } else {
          setTextInput("Call to /api/summary/process failed.");
        }
      });
  };

  // Testing function to call Sentiment analysis fn...
  const getSentiment = () => {
    const body = JSON.stringify({ text: inputValue });
    fetch("/api/sentiment/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.sentiment && data.score) {
          setSentimentText(data.sentiment);
          setSentimentScore(Math.round(data.score * 100));
          if(data.emotions){
            setEmotionLabel(data.emotions.toString())
            }
        } else {
          setTextInput("Call to /api/sentiment/process failed.");
        }
      });
  };

  return (
    <div className="mt-10">
      <NavigationBar />
      <div className="flex justify-between mt-10">
        <p className="flex items-center items-baseline justify-start space-x-4 text-3xl ml-60">
          Sentiment analysis of the text is:
          <span style={setSentimentStyle()}>
            {sentimentText} {`${Number(sentimentScore)}%`}
          </span>
        </p>
        <div className="group relative mr-60">
          <button className="bg-gray-300 text-gray-700 py-4 px-6 rounded inline-flex items-center group">
            <span className="mr-1">Change Font</span>
            <svg
              className="fill-current h-4 w-4 group-hover:rotate-180 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          <ul
            className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-56"
            style={{ zIndex: 3 }}
          >
            <li
              className={
                "bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer"
              }
              onClick={() => handleFontClick("open-sans")}
            >
              Open Sans
            </li>
            <li
              className="bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer"
              onClick={() => handleFontClick("roboto")}
            >
              Roboto
            </li>
            <li
              className="bg-gray-200 hover:bg-gray-400 py-4 px-4 cursor-pointer"
              onClick={() => handleFontClick("mooli")}
            >
              Mooli
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="flex items-center justify-start space-x-4 text-3xl mt-10 ml-60">
          Emotion analysis result:
          <span style={setEmotionStyle()}>{emotionLabel}</span>
        </p>
      </div>
      <div className="flex justify-center gap-5 p-10">
        {/* Left text box */}
        <div className="text-box" style={{ position: "relative" }}>
          <div>
            <div>
              <label htmlFor="inputtedField">
                <i>Text to be Summarised:</i>
              </label>
            </div>
            <div>
              <textarea
                style={{
                  ...inputStyles,
                  border: "2px solid black",
                  padding: "10px",
                  resize: "none"
                }}
                id="inputted-text"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}              
              ></textarea>
            </div>
          </div>
          <button
            onClick={getSummary}
            style={{ backgroundColor: "#2e7faa" }}
            className="mt-8 ml-52 py-2 px-4 text-white rounded"
          >
            Summarise
          </button>
        </div>

        {/* Right text box */}
        <div className="text-box" style={{ position: "relative" }}>
          <div>
            <div className="text-box" style={{ position: "relative" }}>
              <label htmlFor="inputtedValue">
                {" "}
                <i>Summarised Text: </i>
              </label>
              <div>
                <p style={{backgroundColor: "#f0f0f0" }} className="h-[568px] w-[547px] p-10">
                  {textInput}
                </p>
              </div>
            </div>
            <button
              onClick={getSentiment}
              style={{ backgroundColor: "#2e7faa" }}
              className="mt-8 ml-52 py-2 px-4 text-white rounded"
            >
              Sentiment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
