import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div id="Navbar" className="mt-8 font-serif">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          display: "inline-flex",
          width: "100%",
          placeContent: "start space-evenly",
        }}
      >
        <img
          src={require("../media/textinsightslogo.png")}
          id="TextInsights"
          width="500"
          alt=""
        />
        <div className="mt-8 pr-2.5">
          <Link to={"/"} id="Home" className="nav-link">
            Home
          </Link>
        </div>
        <div className="mt-8 pr-2.5">
          <Link to={"/learningMaterialSummary"} className="nav-link">
            Learning Material Summary
          </Link>
        </div>
        <div className="mt-8 pr-2.5">
          <Link to={"/history"} className="nav-link">
            Summary History
          </Link>
        </div>
        <div className="mt-8 pr-2.5">
          <Link to={"/faq"} className="nav-link">
            Questions
          </Link>
        </div>
        <div className="mt-8 pr-2.5">
          <Link to={"/about"} className="nav-link">
            About
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
