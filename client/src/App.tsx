import { Route, Routes } from "react-router-dom";
import React from "react";
import "./styles/style.css";
import Home from "./pages/Home";

const App: React.FC<{}> = () => {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
