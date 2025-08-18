import React from "react";
import styles from "../../assets/input.module.css";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input ref={ref} className={`${styles.input} ${className}`} {...props} />
  );
});

Input.displayName = "Input";
