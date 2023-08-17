import React from "react";
import { useEffect, useState } from "react";

function Home() {
  const [someState, setSomeState] = useState("not set");

  useEffect(() => {
    console.log(`useEffect placeholder... initial state: ${someState}`);
    setSomeState("some state");
    console.log(`After state change: ${someState}`);
  }, [someState]);

  return (
    <>
      <h1>Hello SIS-team-24 </h1>
      <h2>NLP-app</h2>
    </>
  );
}

export default Home;
