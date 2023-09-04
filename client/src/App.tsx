import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import LearningMaterialSummary from "./pages/LearningMaterialSummary";

const App: React.FC<{}> = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/learningMaterialSummary" element={<LearningMaterialSummary/>}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
