import { Action, PayloadAction } from "@reduxjs/toolkit";

import { Epic } from "redux-observable";
import { catchError, filter, Observable, of, switchMap } from "rxjs";
import { loginByCode, loginByPassword, loginShowRoom } from "../../api/user";
import {
  LoginByCodeRequestBody,
  LoginByPasswordRequestBody,
  LoginResult,
  LoginShowRoomRequestBody,
} from "../../api/user/types";
import {
  loginByCodeStart,
  loginByPasswordStart,
  loginFailure,
  loginShowRoomStart,
  loginSuccess,
} from "../slices/user";
import {
  LoginSuccessPayload,
  UserLoginByCodePayload,
  UserLoginByPassPayload,
  UserLoginShowRoomPayload,
} from "../slices/user/payloads";

export const lognByPassEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter((action) => action.type == loginByPasswordStart.type),
    switchMap((action) => {
      const loginAction = action as PayloadAction<UserLoginByPassPayload>;
      const body: LoginByPasswordRequestBody = {
        userKey: loginAction.payload.username,
        password: loginAction.payload.password,
      };
      return loginByPassword(body).pipe(
        switchMap((response: LoginResult) => {
          const userInfo: LoginSuccessPayload = {
            token: response.token,
            username: loginAction.payload.username,
            expiresAt: response.expiresAt,
            message: response.msg,
            code: response.code,
          };
          return of(loginSuccess(userInfo));
        }),

        catchError((err: any) => {
          return of(
            loginFailure({
              error: err?.response?.message
                ? err?.response?.message
                : err.message,
            })
          );
        })
      );
    })
  );

export const loginByCodeEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter((action) => action.type == loginByCodeStart.type),
    switchMap((action) => {
      const loginAction = action as PayloadAction<UserLoginByCodePayload>;
      const body: LoginByCodeRequestBody = {
        userKey: loginAction.payload.mobile,
        Code: loginAction.payload.code,
      };
      return loginByCode(body).pipe(
        switchMap((response: LoginResult) => {
          const userInfo: LoginSuccessPayload = {
            token: response.token,
            username: loginAction.payload.mobile,
            expiresAt: response.expiresAt,
            message: response.msg,
            code: response.code,
          };
          return of(loginSuccess(userInfo));
        }),
        catchError((err: any) => {
          return of(
            loginFailure({
              error: err?.response?.message
                ? err?.response?.message
                : err.message,
            })
          );
        })
      );
    })
  );

export const lognShowRoomEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter((action) => action.type == loginShowRoomStart.type),
    switchMap((action) => {
      const loginAction = action as PayloadAction<UserLoginShowRoomPayload>;
      const body: LoginShowRoomRequestBody = {
        username: loginAction.payload.username,
        password: loginAction.payload.password,
        centerId: loginAction.payload.centerId,
      };
      return loginShowRoom(body).pipe(
        switchMap((response: LoginResult) => {
          const userInfo: LoginSuccessPayload = {
            token: response.token,
            username: loginAction.payload.username,
            expiresAt: response.expiresAt,
            message: response.msg,
            code: response.code,
          };
          return of(loginSuccess(userInfo));
        }),

        catchError((err: any) => {
          return of(
            loginFailure({
              error: err?.response?.message
                ? err?.response?.message
                : err.message,
            })
          );
        })
      );
    })
  );
