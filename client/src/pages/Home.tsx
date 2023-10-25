import React from "react";
import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import NavigationBar from "./NavigationBar";
import Spinner from "../components/Spinner";
import ShareButton from "../components/ShareButton";
import ScrapingInput from "../components/ScrapingInput";
import {
  getStateFromUrl,
  generateSharableUrl,
  serializeState,
} from "./../statePreservationUtils";
import {
  addToHistory,
  clearHistory,
  postRequestOptions,
  retrieveHistory,
} from "../components/Utils";
import {
  getEmojiForEmotion,
  setEmotionStyle,
  setSentimentStyle,
} from "../styles/sentimentStyles";

function Home(this: any) {
  const [finalSummary, setFinalSummary] = useState(""); // State to track summary
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
  const [isCopyButtonDisabled, setIsCopyButtonDisabled] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [urlValue, setUrlValue] = useState("");
  const [scrapeError, setScrapeError] = useState(false);
  const [isScrapeLoading, setScrapeLoading] = useState(false);
  const [isSummaryLoading, setSummaryLoading] = useState(false);
  const [isSummaryError, setSummaryError] = useState(false);
  const [keywords, setKeywords] = useState<{ [k: string]: number }>({});
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Global DOM tracker
  let currentPopup: any = null;

  const copyTextToClipboard = () => {
    const summarisedText = document.getElementById("summary-result");
    if (summarisedText) {
      const textToCopy = summarisedText.innerText;
      showMousePopup(100, 100, "Summarised text copied to clipboard!");
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  // Load the initial state from the URL (if the URL has encoded any state)
  useEffect(() => {
    const initialStateFromUrl = getStateFromUrl();
    if (initialStateFromUrl) {
      // Set the states from the URL
      setFinalSummary(initialStateFromUrl.finalSummary || "");
      setInputValue(initialStateFromUrl.inputValue || "");
      setWordCount(initialStateFromUrl.wordCount || 0);
      setSentimentPlaceholder(
        initialStateFromUrl.sentimentTextPlaceholder || ""
      );
      setEmotionalPlaceholder(
        initialStateFromUrl.emotionalTextPlaceholder || ""
      );
      setSentimentText(initialStateFromUrl.sentimentText || "");
      setSentimentScore(initialStateFromUrl.sentimentScore || "");
      setKeywords(initialStateFromUrl.keywords || {});
      setEmotionLabel(initialStateFromUrl.emotionLabel || "");
      setSelectedFont(initialStateFromUrl.selectedFont || "");
    }
  }, []);

  // Serialize the current state into the URL (make sure this comes after the initial loading)
  useEffect(() => {
    const currentState = {
      finalSummary,
      inputValue,
      wordCount,
      sentimentTextPlaceholder,
      emotionalTextPlaceholder,
      sentimentText,
      sentimentScore,
      keywords,
      emotionLabel,
      selectedFont,
    };
    const serializedState = serializeState(currentState);
    const newUrl = `${window.location.origin}${window.location.pathname}?state=${serializedState}`;

    // Update the URL without adding a new history entry
    window.history.replaceState(null, "", newUrl);
  }, [
    finalSummary,
    inputValue,
    wordCount,
    sentimentTextPlaceholder,
    emotionalTextPlaceholder,
    sentimentText,
    sentimentScore,
    keywords,
    emotionLabel,
    selectedFont,
  ]);

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
        setFinalSummary(data.summary);
        setKeywords(data.keywords);
        addToHistory({ summary: data.summary });

        setIsCopyButtonDisabled(!data.summary || data.summary === "");
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

  // Function to call the scraper API using fetch
  const getScrapedText = async () => {
    setScrapeLoading(true);
    setScrapeError(false);
    try {
      const response = await fetch("/api/scraper/scrape?url=" + urlValue);
      if (!response.ok) {
        throw new Error(
          `Call to /api/scrape failed with status ${response.status}`
        );
      }
      const data = await response.json();
      setInputValue(data?.text);
      const count = calcWordCount(data?.text);
      setWordCount(count);
    } catch (error) {
      console.log(`Call to the scraper API failed. Error: ${error}`);
      setScrapeError(true);
    } finally {
      setScrapeLoading(false);
    }
  };

  const Capitalize = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  // Handle PDF input
  const handlePDFDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    // Specify the PDF.js worker path
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file.type !== "application/pdf") {
      alert("Only PDFs are allowed.");
      return;
    }

    try {
      const pdf = await getDocument(URL.createObjectURL(file)).promise;
      let content = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const pageContent = await page.getTextContent();

        // Handle some parsing errors due to how PDF extracts whitespace in text (would be random whitespace without below)
        let lastItem = pageContent.items[0] as any;

        if (lastItem && "str" in lastItem) {
          content += lastItem.str;

          for (let j = 1; j < pageContent.items.length; j++) {
            const currentItem = pageContent.items[j] as any;

            if ("str" in currentItem) {
              const isSameLine =
                Math.abs(lastItem.transform[5] - currentItem.transform[5]) < 5; // y-coordinate
              const isContinuous =
                currentItem.transform[4] -
                  (lastItem.transform[4] + lastItem.width) <
                2; // x-coordinate

              if (isSameLine && isContinuous) {
                content += currentItem.str;
              } else {
                content += ` ${currentItem.str}`;
              }
            }

            lastItem = currentItem;
          }
        }
      }

      content = cleanExtractedContent(content);
      setInputValue(content);
      const count = calcWordCount(content);
      setWordCount(count);
    } catch (error) {
      console.error("Error reading PDF:", error);
      alert("Error processing PDF. Please try again.");
    }
  };

  const cleanExtractedContent = (content: string) => {
    content = content.replace(/-\s+/g, ""); // Handle hyphens at the end of lines
    content = content.replace(/\s+/g, " "); // Normalize spaces to single spaces
    return content.trim(); // Trim any spaces at the start or end
  };

  const shareURL = (event: any) => {
    const currentState = {
      finalSummary,
      inputValue,
      wordCount,
      sentimentTextPlaceholder,
      emotionalTextPlaceholder,
      sentimentText,
      sentimentScore,
      keywords,
      emotionLabel,
      selectedFont,
    };
    const sharableLink = generateSharableUrl(currentState);

    // Copy to clipboard
    navigator.clipboard
      .writeText(sharableLink)
      .then(() => {
        console.log("Link copied to clipboard");
        const text = "Link copied!";
        // Show the popup
        showMousePopup(event.clientX, event.clientY, text);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const showMousePopup = (mouseX: Number, mouseY: Number, text: string) => {
    // If there's an existing popup, remove it
    if (currentPopup) {
      currentPopup.remove(); // Using the remove method, which is simpler and avoids the error.
      currentPopup = null; // Reset the currentPopup reference
    }

    // Create a new element for the popup
    const popup = document.createElement("div");
    popup.textContent = text;
    popup.style.position = "absolute";
    popup.style.left = `${mouseX}px`;
    popup.style.top = `${mouseY}px`;
    popup.style.backgroundColor = "#000";
    popup.style.color = "#fff";
    popup.style.padding = "8px";
    popup.style.borderRadius = "4px";
    popup.style.zIndex = "1000";
    popup.style.transform = "translate(-50%, 100%)";
    popup.style.transition = "opacity 0.5s"; // Fade out animation
    document.body.appendChild(popup);

    // Store the current popup
    currentPopup = popup;

    // Fade out the popup after a delay and then remove it from the DOM
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => {
        if (popup.parentElement) {
          // Ensure the popup still has a parent
          popup.remove();
        }
        if (popup === currentPopup) {
          currentPopup = null;
        }
      }, 500); // match the duration of the transition
    }, 1000);
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
          <div className="flex justify-between">
            {/* Render the ScrapingInput component */}
            <div className="flex-shrink-0 ">
              <ScrapingInput
                onScrape={getScrapedText}
                isScrapeLoading={isScrapeLoading}
                urlValue={urlValue}
                setUrlValue={setUrlValue}
                scrapeError={scrapeError}
              />
            </div>
            {/* Summarise button start*/}
            <div className="flex-shrink-0 ml-auto">
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
            </div>
            {/* Summarise button end */}
            {/* Summary length start */}
            <div className="group relative flex-shrink-0">
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
                  data-cy="input_textarea"
                  value={inputValue}
                  spellCheck={true}
                  onChange={(e) => {
                    handleInputChange(e);
                    const count = calcWordCount(e.target.value);
                    setWordCount(count);
                  }}
                  // PDF Input handlers
                  ref={textAreaRef}
                  onDrop={(e) => {
                    handlePDFDrop(e);
                    handleInputChange(e);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  placeholder=" Enter 100 words or more to summarise...
                                ──────────── OR ────────────
                                Drag and drop a PDF file to use as input..."
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
                      finalSummary // Show the text content
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
            <div
              data-cy="key-insights-table"
              className="overflow-scroll overflow-x-hidden h-72"
            >
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
                <div
                  data-cy="key-insights-placeholder"
                  className="p-2 text-center mx-auto text-gray-400"
                >
                  {" "}
                  Summarise text to view keywords
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            {/* Share URL button*/}
            {finalSummary !== "" || sentimentText !== "" ? (
              <ShareButton onClickFunction={(e) => shareURL(e)} />
            ) : null}

            {/* Copy Summarised Text to Clipboard Button*/}
            {finalSummary !== "" ? (
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    copyTextToClipboard();
                    showMousePopup(
                      e.clientX,
                      e.clientY,
                      "Summarised text copied to clipboard!"
                    );
                  }}
                  style={{
                    backgroundColor: "#2e7faa",
                    cursor: isCopyButtonDisabled ? "not-allowed" : "pointer",
                  }}
                  className="py-2 px-4 text-white rounded"
                  disabled={isCopyButtonDisabled}
                >
                  Copy Summary Text
                </button>
              </div>
            ) : null}
          </div>

          {/* Emotional analysis & Sentiment analysis result */}
          <div className="h-32">
            {/* Emotion text */}
            <div className="flex flex-col sdivace-x-4 text-l w-full py-2 gap-2">
              <div className="">{emotionalTextPlaceholder}</div>
              <div className="w-full flex gap-4 justify-center">
                {emotionLabel.split(",").map((emotion, index) => (
                  <div
                    key={index}
                    id="emotion-result"
                    style={setEmotionStyle(
                      emotion.charAt(0).toUpperCase() + emotion.slice(1)
                    )}
                  >
                    {emotion.charAt(0).toUpperCase() + emotion.slice(1)}{" "}
                    <span role="img" aria-label={emotion}>
                      {getEmojiForEmotion(emotion)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment text */}
            <div>
              <p className="flex items-baseline justify-start space-x-4 text-l">
                {sentimentTextPlaceholder}
                {sentimentText !== "" ? (
                  <span
                    style={setSentimentStyle(sentimentText)}
                    id="sentiment-result"
                  >
                    {sentimentText} {sentimentScore}%
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          {/* Emotional analysis & Sentiment analysis end */}
        </div>
      </div>
    </div>
  );
}

export default Home;
