import React, { EventHandler } from "react";
import logo from "../../../assets/img/logo.png";
import TermsModal from "../TermsModal/TermsModal";
import Button from "../../../components/Button/Button";
import OTPinput from "../../../components/OTPinput/OTPinput";

export type SelectOptions = {
  name: string;
  id: number;
};

export type AuthFormField = {
  text: string;
  key: string;
  value?: string | undefined;
  type: "text" | "password" | "select" | "number";
  selectOptions?: SelectOptions[];
  hasError: boolean;
  hasErrorMessage?: string | undefined;
  valueChangeHandler: (event: any) => void;
  inputBlurHandler: (event: any) => void;
};

type AuthFormProps = {
  fields: AuthFormField[];
  title: string;
  buttonTitle: string;
  buttonClickHandler: (event: any) => void;
  secondButtonTitle?: string;
  isLoading?: boolean;
  secondButtonClickHandler?: () => void;
};

const AuthForm = ({
  fields,
  title,
  buttonTitle,
  buttonClickHandler,
  secondButtonTitle,
  secondButtonClickHandler,
  isLoading,
}: AuthFormProps) => {
  const renderField = (field: AuthFormField) => {
    if (field.key == "کد")
      return (
        <div>
          <OTPinput label={field.text} getCode={field.valueChangeHandler} />
          {field.hasError && (
            <div className='form-text text-danger'>{field.hasErrorMessage}</div>
          )}
        </div>
      );
    else
      return (
        <div key={field.key} className='mb-3'>
          <label htmlFor={field.text} className='form-label textJustify'>
            {field.text}
          </label>
          {field.type == "select" ? (
            <select
              className='form-select'
              aria-label='select'
              onChange={field.valueChangeHandler}>
              <option> انتخاب کنید</option>
              {field.selectOptions &&
                field.selectOptions.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
            </select>
          ) : (
            <input
              type={field.type}
              className='form-control'
              placeholder={field.key}
              id={field.text}
              value={field.value}
              onChange={field.valueChangeHandler}
              onBlur={field.inputBlurHandler}
            />
          )}

          {field.hasError && (
            <div className='form-text text-danger'>{field.hasErrorMessage}</div>
          )}
        </div>
      );
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: "100vh" }}>
      <div className='card  rounded-3' style={{ width: "340px" }}>
        <div className='card-body'>
          <img width={"70px"} src={logo} alt='logo' className='mb-4' />
          <div>
            <p className='fw-bold fs-5'>{title}</p>
          </div>
          <form onSubmit={buttonClickHandler}>
            {fields.map((field) => {
              return renderField(field);
            })}

            <Button
              loading={isLoading}
              type='submit'
              label={buttonTitle}
              className={
                "btn-primary text-white rounded-3 w-100 mt-4 d-flex justify-content-center"
              }
            />
            {secondButtonTitle && (
              <Button
                disabled={isLoading}
                label={secondButtonTitle}
                className='btn-outline-primary rounded-3 w-100 mt-2'
                onClickHandler={secondButtonClickHandler}
              />
            )}
          </form>
          <TermsModal />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
