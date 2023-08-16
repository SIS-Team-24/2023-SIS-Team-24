import { Routes, Route } from "react-router-dom";
import React from "react";
import "./styles/App.css";
import Home from "./pages/Home";

const App: React.FC<{}> = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
