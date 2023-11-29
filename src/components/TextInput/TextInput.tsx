import TextField from "@mui/material/TextField";
import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";

export interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  type: HTMLInputTypeAttribute;
  valueChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  multiline?: boolean;
  hasError?: boolean;
}

const TextInput = ({
  label,
  type,
  placeholder,
  value,
  valueChangeHandler,
  disabled,
  multiline,
  hasError,
}: TextInputProps) => {
  return (
    <TextField
      error={hasError}
      fullWidth
      disabled={disabled}
      multiline={multiline}
      id='textInput'
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      label={label}
      variant='outlined'
      onChange={valueChangeHandler}
    />
  );
};

export default TextInput;
