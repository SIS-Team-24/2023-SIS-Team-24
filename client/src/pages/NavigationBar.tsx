import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div style={{ fontFamily: "Times New Roman", marginTop: "20px" }}>
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
        <div style={{ marginTop: "30px", paddingRight: "10px" }}>
          <Link to={"/"} className="nav-link">
            Home
          </Link>
        </div>
        <div style={{ marginTop: "30px", paddingRight: "10px" }}>
          <Link to={"/learningMaterialSummary"} className="nav-link">
            Learning Material Summary
          </Link>
        </div>
        <div style={{ marginTop: "30px", paddingRight: "10px" }}>
          <Link to={"/history"} className="nav-link">
            Summary History
          </Link>
        </div>
        <div style={{ marginTop: "30px", paddingRight: "10px" }}>
          <Link to={"/faq"} className="nav-link">
            Questions
          </Link>
        </div>
        <div style={{ marginTop: "30px", paddingRight: "10px" }}>
          <Link to={"/about"} className="nav-link">
            About
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;