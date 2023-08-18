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
      <h1 className="mt-48 font-extrabold">
        <p className="flex items-center justify-center space-x-4 text-3xl">Hello SIS-team-24</p>
      </h1>
      <h2 className="flex items-center justify-center space-x-4 text-xl font-bold underline decoration-violet-400 underline-offset-8 ">
        NLP-app
      </h2>
    </>
  );
}

export default Home;
