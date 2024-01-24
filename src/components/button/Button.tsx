import React from "react";
import style from "./style.module.scss";

interface buttonProps {
  onSubmitButton?: any;
  className?: string;
  children?: any;
}

const Button: React.FC<buttonProps> = ({
  onSubmitButton,
  className,
  children,
  ...props
}) => {
  return (
    <button
      onClick={onSubmitButton}
      {...props}
      className={`${style.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
