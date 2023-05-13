import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestCode, loginByCode, getUserInfo } from "../../api/user";
import styles from "./Login.module.css";
import { finalize } from "rxjs";
import { CodeResponse } from "../../api/user/types";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const [touch, setTouch] = useState({
    email: false,
    password: false,
    phone: false,
  });
  const [step, setStep] = useState("phone");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // setErrors(validate(data, "login"));
  }, [data]);

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
        setIsLoading(false);

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
            else setError("ddddddddd");
          },
          error: (err: Error) => {
            setError(err.message);
          },
        });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {isLoading && <p>loading</p>}
      {!isLoading && (
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
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
