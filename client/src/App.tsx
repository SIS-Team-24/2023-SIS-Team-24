import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import LearningMaterialSummary from "./pages/LearningMaterialSummary";
import About from "./pages/About";
import Questions from "./pages/Questions";

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
