import React, { useEffect, useState } from "react";
import AuthForm, { AuthFormField, SelectOptions } from "../AuthForm/AuthForm";
import useInput from "../../../hooks/use-input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { requestCode, signup } from "../../../api/user";
import { finalize } from "rxjs";
import { CodeResponse, LoginResult } from "../../../api/user/types";
import notifyToast from "../../../components/toast/toast";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { loginSuccess } from "../../../store/slices/user";
import { getAreas, getCounties } from "../../../api/area";

type City = {
  id: number;
  name: string;
  state: string;
};

const Signup = () => {
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

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value: string) => {
    return value.length > 0;
  });

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value: string) => {
    return value.length > 0;
  });

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value: string) => {
    return value.length > 0;
  });

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value: string) => {
    return value.length > 0;
  });

  const {
    value: repeatPasswordValue,
    isValid: repeatPasswordIsValid,
    hasError: repeatPasswordHasError,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
  } = useInput((value: string) => {
    return value.length > 0;
  });

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<"phone" | "signup">("phone");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getCounties()
      .pipe(
        finalize(() => {
          setIsLoading(false);
        })
      )
      .subscribe({
        next: (counties) => {
          getAreas()
            .pipe(
              finalize(() => {
                setIsLoading(false);
              })
            )
            .subscribe({
              next: (areas) => {
                setCities(
                  areas.map((area) => {
                    let c = counties.find(
                      (county) => county.stateRef == area.countyRef
                    );
                    return {
                      id: area.id,
                      name: area.areaName,
                      state: c ? c.countyName : "",
                    };
                  })
                );
              },
              error: (err) => {
                notifyToast("error", {
                  message: err.message,
                });
              },
            });
        },
        error: (err) => {
          notifyToast("error", {
            message: err.message,
          });
        },
      });
  }, []);

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

  if (step == "signup") {
    fields.push({
      text: t("please_type_the_code_sent_to_you"),
      key: t("request_code"),
      value: codeValue,
      type: "password",
      hasError: codeHasError,
      hasErrorMessage: t("please_input_confirm_code").toString(),
      inputBlurHandler: codeBlurHandler,
      valueChangeHandler: codeChangeHandler,
    });
    fields.push({
      text: t("city"),
      key: t("city"),
      value: cityValue,
      type: "select",
      hasError: cityHasError,
      selectOptions: cities,
      hasErrorMessage: t("please_select_city").toString(),
      inputBlurHandler: cityBlurHandler,
      valueChangeHandler: cityChangeHandler,
    });
    fields.push({
      text: t("first_name"),
      key: t("first_name"),
      value: firstNameValue,
      type: "text",
      hasError: firstNameHasError,
      hasErrorMessage: t("please_enter_first_name").toString(),
      inputBlurHandler: firstNameBlurHandler,
      valueChangeHandler: firstNameChangeHandler,
    });
    fields.push({
      text: t("last_name"),
      key: t("last_name"),
      value: lastNameValue,
      type: "text",
      hasError: lastNameHasError,
      hasErrorMessage: t("please_enter_last_name").toString(),
      inputBlurHandler: lastNameBlurHandler,
      valueChangeHandler: lastNameChangeHandler,
    });
    fields.push({
      text: t("password"),
      key: t("password"),
      value: passwordValue,
      type: "password",
      hasError: passwordHasError,
      hasErrorMessage: t("please_enter_password").toString(),
      inputBlurHandler: passwordBlurHandler,
      valueChangeHandler: passwordChangeHandler,
    });
    fields.push({
      text: t("password_repeat"),
      key: t("password_repeat"),
      value: repeatPasswordValue,
      type: "password",
      hasError: repeatPasswordHasError,
      hasErrorMessage: t("passwords_do_not_match").toString(),
      inputBlurHandler: repeatPasswordBlurHandler,
      valueChangeHandler: repeatPasswordChangeHandler,
    });
  }
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
            if (result.alreadyExist)
              notifyToast("error", {
                message: t("phone_number_already_exist"),
              });
            else setStep("signup");
          },
          error: (err: Error) => {
            notifyToast("error", { message: err.message });
          },
        });
    } else if (step == "signup") {
      setIsLoading(false);
      if (!codeIsValid) {
        return;
      }

      if (passwordValue != repeatPasswordValue) {
        notifyToast("error", {
          message: t("passwors_and_repeat_are_not_the_same"),
        });

        return;
      }

      if (
        codeIsValid &&
        phoneIsValid &&
        firstNameIsValid &&
        lastNameIsValid &&
        cityIsValid
      ) {
        setIsLoading(true);
        signup({
          Code: codeValue,
          Userkey: phoneValue,
          Alias: firstNameValue + " " + lastNameValue,
          Password: passwordValue,
          ConfirmPassword: repeatPasswordValue,
          CityId: cityValue,
        })
          .pipe(finalize(() => setIsLoading(false)))
          .subscribe({
            next: (result: LoginResult) => {
              notifyToast("success", {
                message: t("register_success"),
              });
              notifyToast("success", {
                message: result.msg,
              });

              dispatch(
                loginSuccess({
                  token: result.token,
                  message: result.msg,
                  expiresAt: result.expiresAt,
                  username: phoneValue,
                  code: result.code,
                })
              );

              setTimeout(() => {
                navigate("/home");
              }, 0);
            },
            error: (err: Error) => {
              notifyToast("error", {
                message: err.message,
              });
            },
          });
      }
    }
  };

  if (isLoading) return <LoadingSpinner maxHeight />;

  return (
    <AuthForm
      fields={fields}
      title='ثبت نام'
      buttonTitle='ثبت نام'
      buttonClickHandler={submitHandler}
      secondButtonTitle='ورود'
      secondButtonClickHandler={() => {
        navigate("/login");
      }}
    />
  );
};

export default Signup;
