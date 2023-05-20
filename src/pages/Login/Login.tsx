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
import { getProducts } from "../../api/product";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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

  useEffect(() => {
    getProducts().subscribe((res) => {
      console.log(res);
    });
  }, []);

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
        }, 3000);
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
        <h2 className={styles.header}>فرم ورود</h2>

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
        <div className={styles.formButtons}>
          <button>ورود</button>
          <Link to='/signup'>ثبت نام</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
