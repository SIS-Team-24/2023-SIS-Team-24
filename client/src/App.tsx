import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Questions from "./pages/Questions";
import LearningMaterialSummary from "./pages/LearningMaterialSummary";

const App: React.FC<{}> = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learningMaterialSummary" element={<LearningMaterialSummary />} />
          <Route path="/faq" element={<Questions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
