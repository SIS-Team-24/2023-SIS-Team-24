import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div id="Navbar" className="">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <img
          src={require("../media/textinsightslogo.png")}
          id="TextInsights"
          width="400"
          alt=""
        />
        <div className="flex justify-center space-x-10">
          <div className="">
            <Link to={"/"} id="Home" className="hover:underline">
              Home
            </Link>
          </div>
          <div className="">
            <Link to={"/learningMaterialSummary"} className="hover:underline">
              Learning Material Summary
            </Link>
          </div>
          <div className="">
            <Link to={"/history"} className="hover:underline">
              Summary History
            </Link>
          </div>
          <div className="">
            <Link to={"/faq"} className="hover:underline">
              Questions
            </Link>
          </div>
          <div className="">
            <Link to={"/about"} className="hover:underline">
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
