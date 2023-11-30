import React, { useState } from "react";
import ReactCodeInput from "react-code-input";
import { convertNumbersToEnglish } from "../../common/Localization";

const OTPinput = ({ label, getCode }: any) => {
  const [code, setCode] = useState("");

  return (
    <div className='mb-3'>
      <label htmlFor='inputCode' className='form-label textJustify'>
        {label}
      </label>
      <ReactCodeInput
        autoFocus
        value={code}
        inputMode='numeric'
        name='inputCode'
        type='text'
        fields={5}
        inputStyle={{
          width: 45,
          height: 45,
          textAlign: "center",
          margin: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: "0.375rem",
          backgroundColor: "#ffffff",
        }}
        className='d-flex flex-row-reverse justify-content-center'
        onChange={(e) => {
          const value = convertNumbersToEnglish(e);
          const re = /^[0-9\b]+$/;

          if (value === "" || re.test(value)) {
            setCode(value);
            getCode(value);
          }
        }}
      />
    </div>
  );
};

export default OTPinput;
