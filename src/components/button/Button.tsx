import React from "react";
import style from "./style.module.scss";

interface buttonProps {
  onSubmitButton?: any;
  className?: string;
  children?: any;
  disabled?: boolean;
  type?: any;
}

const Button: React.FC<buttonProps> = ({
  onSubmitButton,
  className,
  children,
  type,
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onSubmitButton}
      {...props}
      type={type}
      className={`${className} ${style.button} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
