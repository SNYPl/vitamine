import React from "react";
import style from "./style.module.scss";

interface buttonProps {
  onSubmitButton?: any;
  className?: string;
  children?: any;
  disabled?: boolean;
}

const Button: React.FC<buttonProps> = ({
  onSubmitButton,
  className,
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onSubmitButton}
      {...props}
      className={`${className} ${style.button} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
