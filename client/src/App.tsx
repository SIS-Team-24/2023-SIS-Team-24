import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";

const App: React.FC<{}> = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
