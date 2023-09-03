import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import LearningMaterialSummary from "./pages/LearningMaterialSummary";
import About from "./pages/About";

const App: React.FC<{}> = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learningMaterialSummary" element={<LearningMaterialSummary />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
