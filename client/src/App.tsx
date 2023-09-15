import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Questions from "./pages/Questions";
import LearningMaterialSummary from "./pages/LearningMaterialSummary";
import History from "./pages/History";

const App: React.FC<{}> = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learningMaterialSummary" element={<LearningMaterialSummary />} />
          <Route path="/history" element={<History />} />
          <Route path="/faq" element={<Questions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
