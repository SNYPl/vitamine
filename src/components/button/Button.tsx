import React from "react";
import style from "./style.module.scss";
import { useFormStatus } from "react-dom";
import { LoadingOutlined } from "@ant-design/icons";

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
  const { pending } = useFormStatus();

  return (
    <button
      onClick={onSubmitButton}
      {...props}
      type={type}
      className={`${className} ${style.button} `}
      disabled={disabled}
    >
      {pending ? <LoadingOutlined spin /> : children}
    </button>
  );
};

export default Button;
