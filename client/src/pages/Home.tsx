import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import NavigationBar from "./NavigationBar";

import { addToHistory, clearHistory, postRequestOptions, retrieveHistory } from "../components/Utils";
import DividerHorizontal from "../components/DividerHorizontal";

function Home(this: any) {
    const [someState, setSomeState] = useState("not set");
    const [textInput, setTextInput] = useState("Placeholder");
    const [testTextInput, setTestTextInput] = useState("Insert text here to test analysis storage function");
    const [sentimentText, setSentimentText] = useState("Neutral"); // "Positive", "Neutral", or "Negative"
    const [sentimentScore, setSentimentScore] = useState(0); // Decimal value e.g. 0.97 for 97%

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
                if (data.sentiment && data.score) {
                    setTextInput("Sentiment API call was successful.");
                    setSentimentText(data.sentiment);
                    setSentimentScore(Math.round(data.score * 100));
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

    return (
        <div className="mt-10">
            <NavigationBar />
            <p className="flex items-center justify-start space-x-4 text-3xl ml-60 mt-10">
                Sentiment analysis of the text is:
                <span style={setSentimentStyle()}>
                    {sentimentText} {`${Number(sentimentScore)}%`}
                </span>
            </p>
            <p className="flex items-center justify-start space-x-4 text-3xl ml-60 mt-10">Test</p>
            <div className="flex justify-center gap-5 p-10">
                {/* Left text box */}
                <div
                    className="text-box"
                    style={{ position: "relative" }}
                >
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
                        src={require("../media/SummariseButton.png")}
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
                        src={require("../media/copyButton.png")}
                        alt="Button"
                        // style={{
                        //   position: "absolute",
                        //   bottom: "830px",
                        //   right: "280px",
                        //   width: "51px",
                        //   height: "56px",
                        //   cursor: "pointer",
                        // }}
                        onClick={getSummary}
                    />
                </div>
            </div>

            {/* {textInput && <p className="flex justify-center">{textInput}</p>} */}

            <div
                className="flex justify-center gap-5 p-10"
                style={{
                    marginRight: "820px",
                }}
            >
                <Button
                    variant="active"
                    onClick={getAnalysisHistory}
                >
                    History
                </Button>
                <Button
                    variant="active"
                    onClick={getSentiment}
                >
                    Learning Summary
                </Button>
            </div>

            <br></br>
            {/* <p className="flex items-center justify-center space-x-4 text-3xl">
            Hello SIS-team-24
          </p> */}
        </div>
    );
}

export default Home;