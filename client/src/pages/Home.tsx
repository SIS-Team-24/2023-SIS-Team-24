import React from "react";
import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import Spinner from "./Spinner";
import {
  addToHistory,
  clearHistory,
  postRequestOptions,
  retrieveHistory,
} from "../components/Utils";

function Home(this: any) {
  const [textInput, setTextInput] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [sentimentText, setSentimentText] = useState("Neutral"); // "Positive", "Neutral", or "Negative"
  const [sentimentScore, setSentimentScore] = useState(0); // Decimal value e.g. 0.97 for 97%
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [selectedSumLen, setSelectedSumLen] = useState<
    "short" | "default" | "long"
  >("default");
  const [emotionLabel, setEmotionLabel] = useState("Not set"); // "Happy", "Sad", "angry"
  const [submitted, setSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [isSummaryLoading, setSummaryLoading] = useState(false);
  const [isSummaryError, setSummaryError] = useState(false);

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

  useEffect(() => {
    // Calculate word count when inputValue changes
    const wordCount = calcWordCount(inputValue);
    setIsButtonDisabled(wordCount < 100);
  }, [inputValue]); // Run this effect whenever inputValue changes

  // Calc word count
  const calcWordCount = (text: any) => {
    const words = text.trim().split(/\s+/);
    return text.trim() === "" ? 0 : words.length;
  };

  // Event handler for input value change
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value); // Update the input value in the state
  };

  const handleFontClick = (selectedFont: string) => {
    console.log("new font: font-" + selectedFont);
    setSelectedFont(selectedFont);
  };

  const handleLengthChange = (selectedLength: "short" | "default" | "long") => {
    setSelectedSumLen(selectedLength);
    console.log("Selected length: " + selectedLength);
  };

  // Testing function to call Summary analysis fn...
  const getSummary = async () => {
    setSubmitted(true);
    setSummaryLoading(true);
    setSummaryError(false);
    const body = JSON.stringify({
      text: inputValue,
      summary_len_option: selectedSumLen,
    });
    console.log("submitted: " + submitted);
    await fetch("/api/summary/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTextInput(data.summary);
        addToHistory({ summary: data.summary });
      })
      .catch((e) => {
        // Log this error instead of showing on screen
        console.log(`Call to /api/summary/process failed. Error: ${e}`);
        setSummaryError(true);
      })
      .finally(() => {
        setSummaryLoading(false);
        setSubmitted(false);
      });
  };

  // Testing function to call Sentiment analysis fn...
  const getSentiment = () => {
    const body = JSON.stringify({ text: inputValue });
    fetch("/api/sentiment/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSentimentText(data.sentiment);
        setSentimentScore(Math.round(data.score * 100));
        setEmotionLabel(data.emotions.toString());
      })
      .catch((e) => {
        // Log this error instead of showing on screen
        console.log(`Call to /api/sentiment/process failed. Error: ${e}`);
      });
  };

  const Capitalize = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  return (
    <div>
      <NavigationBar />
      <hr className="h-px mt-2 border-0 bg-gray-300"></hr>
      <div className="flex justify-between mt-10 mx-60">
        <p className="flex items-baseline justify-start space-x-4 text-xl">
          Sentiment analysis of the text is:
          <span style={setSentimentStyle()} id="sentiment-result">
            {sentimentText} {`${Number(sentimentScore)}%`}
          </span>
        </p>
        <div className="flex gap-2">
          <div className="group relative">
            <button className="bg-gray-300 text-gray-700 py-4 px-6 rounded inline-flex items-center group">
              <span className="mr-1">{Capitalize(selectedSumLen)} summary</span>
              <svg
                className="fill-current h-4 w-4 group-hover:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>

            <ul
              className="absolute hidden text-gray-700 pt-1 group-hover:block w-full"
              style={{ zIndex: 3 }}
            >
              <li
                className={
                  "bg-gray-200 hover:bg-gray-100 py-4 px-4 cursor-pointer rounded-t"
                }
                onClick={() => handleLengthChange("short")}
              >
                Short
              </li>
              <li
                className="bg-gray-200 hover:bg-gray-100 py-4 px-4 cursor-pointer"
                onClick={() => handleLengthChange("default")}
              >
                Default
              </li>
              <li
                className="bg-gray-200 hover:bg-gray-100 py-4 px-4 cursor-pointer rounded-b"
                onClick={() => handleLengthChange("long")}
              >
                Long
              </li>
            </ul>
          </div>

          <div className="group relative">
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
            <div>
              <ul
                className="absolute hidden text-gray-700 pt-1 group-hover:block w-full"
                style={{ zIndex: 3 }}
              >
                <li
                  className={
                    "bg-gray-200 hover:bg-gray-100 py-4 px-4 cursor-pointer rounded-t"
                  }
                  onClick={() => handleFontClick("open-sans")}
                >
                  Open Sans
                </li>
                <li
                  className="bg-gray-200 hover:bg-gray-100 py-4 px-4 cursor-pointer"
                  onClick={() => handleFontClick("roboto")}
                >
                  Roboto
                </li>
                <li
                  className="bg-gray-200 hover:bg-gray-100 py-4 px-4 cursor-pointer rounded-b"
                  onClick={() => handleFontClick("mooli")}
                >
                  Mooli
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="flex items-center justify-start space-x-4 text-xl mt-10 ml-60">
          Emotion analysis result:
          <span id="emotion-result" style={setEmotionStyle()}>
            {emotionLabel}
          </span>
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
                  fontFamily: selectedFont || "Open Sans",
                }}
                className="h-[568px] w-[547px] p-10 border-black border-2 border-solid resize-none"
                id="inputted-text"
                value={inputValue}
                spellCheck={true}
                onChange={(e) => {
                  handleInputChange(e);
                  const count = calcWordCount(e.target.value);
                  setWordCount(count);
                }}
                placeholder="Enter 100 words or more to summarise..."
              ></textarea>
            </div>
            <p>
              Word Count: {wordCount} {wordCount === 1 ? "word" : "words"}
            </p>
          </div>
          <button
            id="summarise-button-id"
            onClick={getSummary}
            style={{
              backgroundColor: "#2e7faa",
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
            }}
            className="mt-8 ml-52 py-2 px-4 text-white rounded"
            disabled={isButtonDisabled}
            title="Enter 100 words to summarise it"
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
                <p
                  style={{
                    fontFamily: selectedFont || "Open Sans",
                    backgroundColor: "#f0f0f0",
                    maxHeight: "568px",
                    overflowY: "auto",
                  }}
                  className="h-[568px] w-[547px] p-10 border-black border-2 border-solid"
                  id="summary-result"
                >
                  {isSummaryLoading ? (
                    <Spinner isError={false} /> // Show loading spinner while the API call is in progress
                  ) : isSummaryError ? (
                    <Spinner isError={true} /> // Show error spinner if the API call failed
                  ) : (
                    textInput // Show the text content
                  )}
                </p>
              </div>
            </div>
            <button
              id="sentiment-button"
              onClick={getSentiment}
              style={{
                backgroundColor: "#2e7faa",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              className="mt-8 ml-52 py-2 px-4 text-white rounded"
              disabled={isButtonDisabled}
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
