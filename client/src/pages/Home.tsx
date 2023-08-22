import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";

function Home() {
  const [someState, setSomeState] = useState("not set");
  const [textInput, setTextInput] = useState("Placeholder");

  useEffect(() => {
    console.log(`useEffect placeholder... initial state: ${someState}`);
    setSomeState("some state");
    console.log(`After state change: ${someState}`);
  }, [someState]);

  // Testing function to call Summary analysis fn...
  const getSummary = () => {
    setTextInput("call summary api here...");
  };

  // Testing function to call Sentiment analysis fn...
  const getSentiment = () => {
    setTextInput("call sentimemnt api here...");
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
      {textInput && <p className="flex justify-center">{textInput}</p>}
    </>
  );
}

export default Home;
