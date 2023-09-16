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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(`useEffect placeholder... initial state: ${someState}`);
    setSomeState("some state");
    console.log(`After state change: ${someState}`);
  }, [someState]);

  // Event handler for input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update the input value in the state
  };

  const handleFontClick = (selectedFont: string) => {
    console.log("new font: font-" + selectedFont);
    setSelectedFont(selectedFont);
  };

  // Testing function to call Summary analysis fn...
  const getSummary = () => {
    setSubmitted(true);
    console.log("submitted: " + submitted);
    const body = JSON.stringify({ text: inputValue });
    fetch("/api/summary/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        if (data.summary) {
          setTextInput("Summary API call was successful.");
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
          setTextInput("Sentiment API call was successful.");
          setSentimentText(data.sentiment);
          setSentimentScore(Math.round(data.score * 100));
        } else {
          setTextInput("Call to /api/sentiment/process failed.");
        }
      });
  };

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

  const inputStyles = {
    fontFamily: selectedFont || "Open Sans",
    backgroundColor: "white",
    border: "2px solid black",
    padding: "10px",
    width: "547px",
    height: "568px",
  };

  return (
    <div className="mt-10">
      <NavigationBar />
      <div className="flex inline-flex items-baseline">
        <p className="flex items-center justify-start space-x-4 text-3xl mt-10 ml-60">
          Sentiment analysis of the text is:
          <span style={setSentimentStyle()}>
            {sentimentText} {`${Number(sentimentScore)}%`}
          </span>
        </p>
        <div className="group relative ml-80">
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
              onClick={() => handleFontClick("serif")}
            >
              Times New Roman
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-5 p-10">
        {/* Left text box */}
        <div className="text-box" style={{ position: "relative" }}>
          <div>
            <div>
              <label htmlFor="inputtedField">Input Field:</label>
            </div>
            <div>
              <input
                style={{
                  ...inputStyles,
                  border: "2px solid black",
                  padding: "10px",
                }}
                type="text"
                id="inputted-text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            onClick={getSummary}
            className="mt-8 ml-52 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Summarise
          </button>
        </div>

        {/* Right text box */}
        <div className="text-box" style={{ position: "relative" }}>
          <div>
            {submitted ? (
              <div className="text-box" style={{ position: "relative" }}>
                <label htmlFor="inputtedValue">Input Value: </label>
                <div>
                  <input
                    style={{ ...inputStyles, backgroundColor: "#f0f0f0" }}
                    value={textInput}
                  />
                </div>
                <button
                  onClick={getSentiment}
                  className="mt-8 ml-52 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                  Sentiment
                </button>
              </div>
            ) : (
              <div className="text-box" style={{ position: "relative" }}>
                <label htmlFor="inputtedValue">Input Value: </label>
                <div>
                  <input
                    style={{ ...inputStyles, backgroundColor: "#f0f0f0" }}
                    value={"Enter your text to be summarised first..."}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
