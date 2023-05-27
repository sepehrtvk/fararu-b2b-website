import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestCode, loginByCode, getUserInfo } from "../../api/user";
import styles from "./Login.module.css";
import { finalize } from "rxjs";
import { CodeResponse } from "../../api/user/types";
import notifyToast from "../../components/toast/toast";
import { useTranslation } from "react-i18next";
import { clearError, loginByCodeStart } from "../../store/slices/user";
import { clearCustomer } from "../../store/slices/customer";
import { deleteBasket } from "../../store/slices/basket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import logo from "../../assets/img/logo.png";
import { toLocaleNumberString } from "../../common/Localization";

const Login = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const loginError = useAppSelector((store) => store.user.loginError);

  useEffect(() => {
    if (loginError) notifyToast("error", { message: loginError });
  }, [loginError]);

  const [touch, setTouch] = useState({
    email: false,
    password: false,
    phone: false,
  });
  const [step, setStep] = useState("phone");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeHandler = (event: any) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };
  const focusHandler = (event: any) => {
    setTouch({ ...touch, [event.target.name]: true });
  };
  const submitHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    if (step == "phone") {
      if (errors.phone) {
        setTouch({
          email: true,
          password: true,
          phone: true,
        });
        return;
      }
      requestCode({ Userkey: data.phone })
        .pipe(finalize(() => setIsLoading(false)))
        .subscribe({
          next: (result: CodeResponse) => {
            if (result.alreadyExist) setStep("code");
            else {
              notifyToast("error", {
                message: t("mobile_number_is_not_registered"),
              });
              setError(t("mobile_number_is_not_registered"));
            }
          },
          error: (err: Error) => {
            notifyToast("error", { message: err.message });
            setError(err.message);
          },
        });
    } else {
      dispatch(clearError());
      dispatch(clearCustomer());
      if (data.phone) {
        dispatch(deleteBasket());
        dispatch(clearCustomer());
        dispatch(loginByCodeStart({ mobile: data.phone, code: data.password }));
        setTimeout(() => {
          navigate("/home");
        }, 0);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <div className='d-flex align-items-center'>
          <div>
            <img width={"70px"} src={logo} alt='logo' />
          </div>

          <span className={styles.header}>فرم ورود</span>
        </div>

        {step == "phone" && (
          <div className={styles.formBox}>
            <label>شماره تلفن</label>
            <input
              type='text'
              name='phone'
              maxLength={11}
              value={data.phone}
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                errors.phone && touch.phone
                  ? styles.unValidate
                  : styles.validate
              }
            />
            {errors.phone && touch.phone && <span>{errors.phone}</span>}
          </div>
        )}
        {step == "code" && (
          <div className={styles.formBox}>
            <label>کد</label>
            <input
              type='password'
              name='password'
              value={data.password}
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                errors.password && touch.password
                  ? styles.unValidate
                  : styles.validate
              }
            />
            {errors.password && touch.password && (
              <span>{errors.password}</span>
            )}
          </div>
        )}
        <div className='d-flex flex-column'>
          <button className='btn btn-primary rounded-2 text-white'>ورود</button>
          <Link className='btn btn-ligh2 mt-3 rounded-2 ' to='/signup'>
            ثبت نام
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
