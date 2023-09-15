/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const DividerHorizontal = ({
  className,
  divider = "/img/divider-2.svg",
}) => {
  return (
    <div className={`divider-horizontal ${className}`}>
      <div className="div" />
      <img className="divider" alt="Divider" src={divider} />
    </div>
  );
};

DividerHorizontal.propTypes = {
  divider: PropTypes.string,
};
