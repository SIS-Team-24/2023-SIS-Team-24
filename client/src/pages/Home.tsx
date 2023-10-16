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
  const [sentimentTextPlaceholder, setSentimentPlaceholder] = useState("");
  const [emotionalTextPlaceholder, setEmotionalPlaceholder] = useState("");
  const [sentimentText, setSentimentText] = useState(""); // "Positive", "Neutral", or "Negative"
  const [sentimentScore, setSentimentScore] = useState(0); // Decimal value e.g. 0.97 for 97%
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [selectedSumLen, setSelectedSumLen] = useState<
    "short" | "default" | "long"
  >("default");
  const [emotionLabel, setEmotionLabel] = useState(""); // "Happy", "Sad", "angry"
  const [submitted, setSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [isSummaryLoading, setSummaryLoading] = useState(false);
  const [isSummaryError, setSummaryError] = useState(false);
  const [keywords, setKeywords] = useState<{ [k: string]: number }>({});

  const setSentimentStyle = () => {
    switch (sentimentText) {
      case "Positive":
        return {
          color: "#65a30d",
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

  const setEmotionStyle = (emotionLabel:string) => {
    switch (emotionLabel) {
      case "Anger":
        return {
          backgroundColor: "red",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      case "Admiration":
        return {
          backgroundColor: "purple",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      case "Amusement":
        return {
          backgroundColor: "gold",
          color: "black",
          padding: "8px",
          borderRadius: "4px",
        };
      case "Annoyance":
        return {
          backgroundColor: "darkred",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Approval":
          return {
            backgroundColor: "green",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Caring":
          return {
            backgroundColor: "lavender",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Confusion":
          return {
            backgroundColor: "lightgrey",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Curiosity":
          return {
            backgroundColor: "lightyellow",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Desire":
          return {
            backgroundColor: "darkpink",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Disappointment":
          return {
            backgroundColor: "grey",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Disapproval":
          return {
            backgroundColor: "darkorange",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Disgust":
          return {
            backgroundColor: "darkgreen",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Embarrassment":
          return {
            backgroundColor: "lightpink",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Excitement":
          return {
            backgroundColor: "brightyellow",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Fear":
          return {
            backgroundColor: "darkblue",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Gratitude":
          return {
            backgroundColor: "limegreen",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Grief":
          return {
            backgroundColor: "darkgrey",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Joy":
          return {
            backgroundColor: "lightgreen",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Love":
          return {
            backgroundColor: "pink",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Nervousness":
          return {
            backgroundColor: "lightblue",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Optimism":
          return {
            backgroundColor: "brightyellow",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Pride":
          return {
            backgroundColor: "royalblue",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Realization":
          return {
            backgroundColor: "darkpurple",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Relief":
          return {
            backgroundColor: "limegreen",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Remorse":
          return {
            backgroundColor: "darkgrey",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Sadness":
          return {
            backgroundColor: "lightblue",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
        case "Surprise":
          return {
            backgroundColor: "lightpink",
            color: "black",
            padding: "8px",
            borderRadius: "4px",
          };
          case "Neutral":
          return {
            backgroundColor: "white",
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
  
  const getEmojiForEmotion = (emotion: string) => {
    const emojiMap: { [key: string]: string } = {
      joy: "😄",
      sadness: "😢",
      anger: "😡",
      love: "❤️",
      surprise: "😲",
      admiration: "😍",
      amusement: "😄",
      annoyance: "😒",
      approval: "👍",
      caring: "🥰",
      confusion: "😕",
      curiosity: "🤔",
      desire: "😍",
      disappointment: "😞",
      disapproval: "👎",
      disgust: "🤢",
      embarrassment: "😳",
      excitement: "😃",
      fear: "😨",
      gratitude: "🙏",
      grief: "😢",
      nervousness: "😬",
      optimism: "😊",
      pride: "🦚",
      realization: "💡",
      relief: "😌",
      remorse: "😔",
      neutral: "😐",
    };

    const emoji = emojiMap[emotion];
    return emoji ? (
      <span role="img" aria-label={emotion}>
        {emoji}
      </span>
    ) : null;
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
        setKeywords(data.keywords);
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
    // set all the states if a user clicks on the sentiment button
    // when a user inputs something in the text box and clicks on it
    const body = JSON.stringify({ text: inputValue });
    fetch("/api/sentiment/process", { ...postRequestOptions, body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSentimentPlaceholder("Sentiment analysis of the text is:");
        setEmotionalPlaceholder("Emotional analysis result:");
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
    <div className="mb-10">
      {/* Navigation Bar start*/}
      <NavigationBar />
      {/* Navigation Bar end */}
      <hr className="h-px mt-2 border-0 bg-gray-300"></hr>
      <div className="flex w-full mx-auto gap-8 justify-center">
        {/* Left Column */}
        <div className="w-[750px] mt-8">
          {/* Summarise btn + Summary length */}
          <div className="flex justify-end">
            {/* Summarise button start*/}
            <button
              id="summarise-button-id"
              onClick={getSummary}
              style={{
                backgroundColor: "#2e7faa",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              className="py-2 px-4 mr-6 text-white rounded"
              disabled={isButtonDisabled}
              title="Enter 100 words to summarise it"
            >
              Summarise
            </button>
            {/* Summarise button end */}
            {/* Summary length start */}
            <div className="group relative">
              <button className="bg-gray-300 text-gray-700 py-2 px-6 rounded inline-flex items-center group">
                <span className="">{Capitalize(selectedSumLen)} summary</span>
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
            {/* Summary length end */}
          </div>

          {/* Input textbox */}
          <div className="flex">
            <div className="text-box">
              <div>
                <label htmlFor="inputtedField">
                  <i>Text to be Summarised:</i>
                </label>
              </div>
              <div className="flex flex-row">
                <textarea
                  style={{
                    fontFamily: selectedFont || "Open Sans",
                  }}
                  className="h-80 w-[750px] p-5 border-black border-2 border-solid resize-none"
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
              <p className="ml-1">
                Word Count: {wordCount} {wordCount === 1 ? "word" : "words"}
              </p>
            </div>
          </div>

          {/* Sentiment btn + change font */}
          <div className="flex justify-end">
            <button
              id="sentiment-button"
              onClick={getSentiment}
              style={{
                backgroundColor: "#2e7faa",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              className="py-2 px-4 mr-16 text-white rounded"
              disabled={isButtonDisabled}
            >
              Sentiment
            </button>
            <div className="group relative">
              <button className="bg-gray-300 text-gray-700 py-2 px-6 rounded inline-flex items-center group">
                <span className="">Change Font</span>
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

          {/* Output text box */}
          <div className="text-box">
            <div>
              <div className="text-box">
                <label htmlFor="inputtedValue">
                  {" "}
                  <i>Summarised Text: </i>
                </label>
                {/* Summary  */}
                <div>
                  <p
                    style={{
                      fontFamily: selectedFont || "Open Sans",
                      backgroundColor: "#f0f0f0",
                      maxHeight: "508px",
                      overflowY: "auto",
                    }}
                    className="w-[750px] h-80 p-5 border-black border-2 border-solid"
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
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-96 gap-4 mt-8">
          {/* Heading */}
          <div className="py-2 text-2xl text-gray-800 border-b">
            Key Insights
          </div>

          {/* List of keywords */}
          <div className="w-96 relative bg-gray-100">
            <div className="flex text-center bg-gray-300">
              <div className="p-2 border-r-2 border-white w-56">Keywords</div>
              <div className="flex-1 p-2">Count</div>
            </div>
            <div className="overflow-scroll overflow-x-hidden h-72">
              {Object.keys(keywords).length > 0 ? (
                <>
                  <div className="flex flex-col">
                    {Object.keys(keywords).map((k) => (
                      <div className="flex text-center p-2 even:bg-white">
                        <div className="w-2/3">{k}</div>
                        <div className="flex-1">{keywords[k]}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-2 text-center mx-auto text-gray-400">
                  {" "}
                  Summarise text to view keywords
                </div>
              )}
            </div>
          </div>

          {/* Emotional analysis & Sentiment analysis result */}
          <div className="h-32">
            {/* Emotion text */}
            <div className="flex flex-col sdivace-x-4 text-l w-full py-2 gap-2">
              <div className="">
                {emotionalTextPlaceholder}
              </div>
              <div className="w-full flex gap-4 justify-center">  
                {emotionLabel.split(',').map((emotion, index) => (
                  <div key={index} id="emotion-result" style={setEmotionStyle(emotion.charAt(0).toUpperCase() + emotion.slice(1))}>
                    {emotion.charAt(0).toUpperCase() + emotion.slice(1)} {getEmojiForEmotion(emotion)}
                  </div>
                ))}
              </div>
            </div>
            {/* Sentiment text */}
            <div>
              <p className="flex items-baseline justify-start space-x-4 text-l">
                {sentimentTextPlaceholder}
                <span style={setSentimentStyle()} id="sentiment-result">
                  {sentimentText !== "" &&
                    `${sentimentText} ${sentimentScore}%`}
                </span>
              </p>
            </div>
          </div>

          <div>
            <div className="">
              <p
                className="p-5 border-black border-2 border-solid"
                id="summary-result"
              ></p>
            </div>
          </div>
        </div>
        {/* Emotional analysis & Sentiment analysis end */}
      </div>
    </div>
  );
}

export default Home;
