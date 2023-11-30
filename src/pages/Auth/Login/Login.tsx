import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestCode, loginByCode, getUserInfo } from "../../../api/user";
import styles from "./Login.module.css";
import { finalize } from "rxjs";
import { CodeResponse } from "../../../api/user/types";
import notifyToast from "../../../components/toast/toast";
import { useTranslation } from "react-i18next";
import { clearError, loginByCodeStart } from "../../../store/slices/user";
import { clearCustomer } from "../../../store/slices/customer";
import { deleteBasket } from "../../../store/slices/basket";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import logo from "../../../assets/img/logo.png";
import { toLocaleNumberString } from "../../../common/Localization";
import AuthForm, { AuthFormField } from "../AuthForm/AuthForm";
import useInput from "../../../hooks/use-input";

const Login = () => {
  const fields: AuthFormField[] = [];

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput((value: string) => {
    return value.length == 11 && +value;
  });

  const {
    value: codeValue,
    isValid: codeIsValid,
    hasError: codeHasError,
    valueChangeHandler: codeChangeHandler,
    inputBlurHandler: codeBlurHandler,
  } = useInput((value: string) => {
    return +value;
  });

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "code">("phone");
  const loginError = useAppSelector((store) => store.user.loginError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (step == "phone")
    fields.push({
      text: "شماره همراه خود را وارد نمایید.",
      key: "شماره همراه",
      value: phoneValue,
      type: "number",
      hasError: phoneHasError,
      hasErrorMessage: "شماره درست نیست",
      inputBlurHandler: phoneBlurHandler,
      valueChangeHandler: phoneChangeHandler,
    });

  if (step == "code")
    fields.push({
      text: t("please_type_the_code_sent_to_you"),
      key: "کد",
      value: codeValue,
      type: "password",
      hasError: codeHasError,
      hasErrorMessage: "کد صحیح نیست",
      inputBlurHandler: codeBlurHandler,
      valueChangeHandler: codeChangeHandler,
    });

  const submitHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    if (step == "phone") {
      if (!phoneIsValid) {
        setIsLoading(false);
        return;
      }
      requestCode({ Userkey: phoneValue })
        .pipe(finalize(() => setIsLoading(false)))
        .subscribe({
          next: (result: CodeResponse) => {
            if (result.alreadyExist) setStep("code");
            else {
              notifyToast("error", {
                message: t("mobile_number_is_not_registered"),
              });
            }
          },
          error: (err: Error) => {
            notifyToast("error", { message: err.message });
          },
        });
    } else if (step == "code") {
      setIsLoading(false);
      if (!codeIsValid) {
        return;
      }

      dispatch(clearError());
      dispatch(clearCustomer());
      if (phoneValue && codeValue) {
        dispatch(deleteBasket());
        dispatch(clearCustomer());
        dispatch(loginByCodeStart({ mobile: phoneValue, code: codeValue }));
      }

      if (loginError) notifyToast("error", { message: loginError });
      else
        setTimeout(() => {
          navigate("/home");
        }, 0);
    }
  };

  // if (isLoading) return <LoadingSpinner maxHeight />;

  return (
    <AuthForm
      fields={fields}
      title='ورود'
      buttonTitle='ورود'
      buttonClickHandler={submitHandler}
      secondButtonTitle='ثبت نام'
      secondButtonClickHandler={() => {
        navigate("/signup");
      }}
      isLoading={isLoading}
    />
  );
};

export default Login;
