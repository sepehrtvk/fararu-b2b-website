import React from "react";
import { ButtonProps } from "./type";
import Lottie from "lottie-react";
import LoadingLottie from "./loading.json";

const Button = ({
  label,
  disabled,
  loading,
  className,
  onClickHandler,
  type,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      type={type}
      className={"btn " + className}
      onClick={onClickHandler}>
      {loading ? (
        <Lottie loop animationData={LoadingLottie} style={{ width: 50 }} />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

export default Button;
