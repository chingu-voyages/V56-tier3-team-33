import React from "react";
import styles from "../../assets/label.module.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className = "", ...props }) => {
  return <label className={`${styles.label} ${className}`} {...props} />;
};
