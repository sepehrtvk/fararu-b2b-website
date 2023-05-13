import { map, Observable, throwError } from "rxjs";
import { Api } from "..";
import { convertNumbersToEnglish } from "../../common/Localization";
import {
  CodeResponse,
  ForgetPasswordRequestBody,
  ForgetPasswordResponseBody,
  LoginByCodeRequestBody,
  LoginByPasswordRequestBody,
  LoginResult,
  LoginShowRoomRequestBody,
  PolUserOdata,
  RequestCodeBody,
  SetPasswordRequestBody,
  SignupRequestBody,
  UserInfo,
} from "./types";
import i18n from "i18next";

export const getUserInfo = (
  userId: number,
  token: string
): Observable<UserInfo> =>
  new Api()
    .get<{ customerId: number; customerGroupId: number; dcRef: number }>(
      "api/poluser/userinfo",
      {
        params: { id: userId },
        headers: { authorization: `Bearer ${token}` },
      }
    )
    .pipe(
      map((response) => ({
        CustomerId: response.customerId,
        CustomerGroupId: response.customerGroupId,
        DcRef: response.dcRef,
      }))
    );

export const requestCode = (body: RequestCodeBody) => {
  body.Userkey = convertNumbersToEnglish(body.Userkey);
  if (/^0\d{10}/.test(body.Userkey))
    return new Api().post<CodeResponse>("api/poluser/requestcode", { body });
  else
    return throwError(
      () => new Error(i18n.t("mobile_number_is_wrong").toString())
    );
};

export const signup = (body: SignupRequestBody) => {
  body.Userkey = convertNumbersToEnglish(body.Userkey);
  body.Password = convertNumbersToEnglish(body.Password);
  body.ConfirmPassword = convertNumbersToEnglish(body.ConfirmPassword);
  body.Code = convertNumbersToEnglish(body.Code);
  if (/^0\d{10}/.test(body.Userkey))
    return new Api().post<LoginResult>("api/poluser/signup", { body });
  else
    return throwError(
      () => new Error(i18n.t("mobile_number_is_wrong").toString())
    );
};

export const loginByPassword = (body: LoginByPasswordRequestBody) => {
  body.userKey = convertNumbersToEnglish(body.userKey);
  body.password = convertNumbersToEnglish(body.password);
  if (/^0\d{10}/.test(body.userKey))
    return new Api().post<LoginResult>("api/poluser/signin", {
      body,
      log: true,
    });
  else
    return throwError(
      () => new Error(i18n.t("mobile_number_is_wrong").toString())
    );
};

export const loginByCode = (body: LoginByCodeRequestBody) => {
  body.userKey = convertNumbersToEnglish(body.userKey);
  body.Code = convertNumbersToEnglish(body.Code);
  if (/^0\d{10}/.test(body.userKey))
    return new Api().post<LoginResult>("api/poluser/signin", {
      body,
      log: true,
    });
  else
    return throwError(
      () => new Error(i18n.t("mobile_number_is_wrong").toString())
    );
};

export const forgetPassword = (body: ForgetPasswordRequestBody) => {
  body.userKey = convertNumbersToEnglish(body.userKey);
  body.NewPassword = convertNumbersToEnglish(body.NewPassword);
  body.ConfirmPassword = convertNumbersToEnglish(body.ConfirmPassword);
  body.Code = convertNumbersToEnglish(body.Code);
  if (/^0\d{10}/.test(body.userKey))
    return new Api().post<ForgetPasswordResponseBody>(
      "api/poluser/ForgetPassword",
      { body }
    );
  else
    return throwError(
      () => new Error(i18n.t("mobile_number_is_wrong").toString())
    );
};
export const setPassword = (body: SetPasswordRequestBody) => {
  body.Code = convertNumbersToEnglish(body.Code);
  body.ConfirmPassword = convertNumbersToEnglish(body.ConfirmPassword);
  body.Password = convertNumbersToEnglish(body.Password);
  return new Api().post<any>("api/poluser/setPassword", { body });
};

export const loginShowRoom = (body: LoginShowRoomRequestBody) => {
  body.username = convertNumbersToEnglish(body.username);
  body.password = convertNumbersToEnglish(body.password);
  return new Api().post<LoginResult>("api/appuser/signin", {
    body,
  });
};

export const getUserOdata = (userId: number): Observable<PolUserOdata | null> =>
  new Api()
    .get<{ value: PolUserOdata[] }>("PolUserOdata", {
      params: {
        $top: 1,
        $filter: `id eq ${userId}`,
      },
    })
    .pipe(map((response) => (response.value ? response.value[0] : null)));
