import React from "react";

export type ButtonProps = {
  variant: "neutral" | "active";
};

const Button: React.FC<React.ComponentProps<"button"> & ButtonProps> = ({ variant, className: userClassName, children, ...props }) => {
  const buttonStyle = {
    neutral: "border-slate-300 hover:border-slate-500",
    active: "border-purple-300 hover:border-purple-500",
    // Define new set of reusable style here...
  };
  const className = `${userClassName || ""} ${buttonStyle[variant]} rounded-lg border-2 p-2`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
