import React from "react";

import css from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  alternative?: boolean;
  action?: () => void;
};

function Button({
  children,
  styles,
  alternative,
  type = "button",
  action,
}: ButtonProps) {
  return (
    <button
      onClick={action}
      style={styles}
      type={type}
      className={alternative ? css.alternativeButton : css.button}
    >
      {children}
    </button>
  );
}

export default Button;
