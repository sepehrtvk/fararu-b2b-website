import { catchError, map, Observable, tap } from "rxjs";
import { ajax, AjaxError, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { AppConfig } from "../common/app-config";
import { deleteBasket } from "../store/slices/basket";
import { clearCustomer } from "../store/slices/customer";
import { logout } from "../store/slices/user";
import { store } from "../store/store";
import i18n from "i18next";

import UrlAssembler from "url-assembler";
export interface ReponseHeader {
  key: string;
  value: string;
}
export class Api {
  protected getBaseUrl(): string {
    // const serverConfig = store.getState().config;
    // return `${serverConfig.server.url + ':' + serverConfig.server.port}`;
    return `${AppConfig.api.server.url + ":" + AppConfig.api.server.port}`;
  }
  private createUrl(method: string, params?: {}, query?: {}): string {
    let url = new UrlAssembler(this.getBaseUrl()).template(method);
    if (params !== undefined && params !== null) url = url.param(params);
    if (query !== undefined && query !== null) url = url.query(query);
    let str = url.toString();
    return str;
  }
  private generateHeaders(): {} | null {
    const token = store.getState().user.token;
    console.log("token");
    console.log(token);
    const appType = AppConfig.login;
    const centerId = store.getState().user.centerId;
    const headers: any = {};
    headers.appType = appType;
    if (token) headers.authorization = `Bearer ${token}`;
    if (centerId) headers.centerId = centerId;
    return {
      ...headers,
      Language: "fa",
      Accept: "*/*",
      // "Accept-Encoding": "gzip, deflate, br",
      // Connection: "keep-alive",
      "x-requested-with": "XMLHttpRequest",
    };
  }

  private appendHeaders(headers?: {}): {} | undefined {
    const generalHeaders = this.generateHeaders();
    if (generalHeaders) {
      if (headers) return { ...headers, ...generalHeaders };
      else return generalHeaders;
    }
  }

  private processRequest<T>(
    request: Observable<AjaxResponse<T>>,
    log?: boolean
  ) {
    return request.pipe(
      map((response) => ({
        response: response.response as T,
        request: response.request,
        headers: response.xhr.getAllResponseHeaders(),
      })),
      catchError((errorResponse: AjaxResponse<T>) => {
        if (errorResponse.status == 401) {
          store.dispatch(logout());
          store.dispatch(clearCustomer());
          store.dispatch(deleteBasket());
        }

        if (errorResponse.status == 0)
          throw new Error(i18n.t("connection_lost").toString());
        else throw errorResponse;
      })
    );
  }

  post<T>(
    method: string,
    config?: RequestConfig,
    responseHeaders?: any
  ): Observable<T> {
    const headers = this.appendHeaders(config?.headers);
    // return ajax
    //   .post<T>(this.createUrl(method), body, headers)
    //   .pipe(map(response => response.response));
    return this.processRequest<T>(
      ajax({
        method: "POST",
        url: this.createUrl(method),
        body: config?.body,
        headers: headers,
        responseType: "json",
      }),
      config?.log
    ).pipe(
      tap((r) => {
        if (config && config.request != undefined) {
          for (var k in r.request)
            (config.request as any)[k] = (r.request as any)[k];
        }
        if (responseHeaders != undefined) {
          const hds = r.headers.split("\n");
          for (var k in hds) {
            const keyValues = hds[k].split(": ");
            if (keyValues.length == 2)
              responseHeaders.push({
                key: keyValues[0].trim(),
                value: keyValues[1].trim(),
              });
          }
        }
      }),
      map((r) => r.response),
      catchError((error: AjaxError) => {
        if (error.status == 401) {
          store.dispatch(logout());
          store.dispatch(clearCustomer());
          store.dispatch(deleteBasket());
        }
        if (error?.response?.errors) {
          const msg = error.response.errors
            .map((er: any) => er.errorMessage)
            .join("\n");
          throw new Error(msg);
        }
        if (error?.response?.message) throw new Error(error.response.message);
        if (error?.message) throw new Error(error.message);
        throw new Error("Unhandled Error!");
      })
    );
  }
  get<T>(
    method: string,
    config?: RequestConfig,
    responseHeaders?: any
  ): Observable<T> {
    const headers = this.appendHeaders(config?.headers);
    // const r = ajax.getJSON<T>(this.createUrl(method, params, query), headers);

    return this.processRequest<T>(
      ajax({
        method: "GET",
        url: this.createUrl(method, config?.params, config?.query),
        headers: headers,
        responseType: "json",
      }),
      config?.log
    ).pipe(
      tap((r) => {
        if (config && config.request != undefined) {
          for (var k in r.request)
            (config.request as any)[k] = (r.request as any)[k];
        }
        if (responseHeaders != undefined) {
          const hds = r.headers.split("\n");
          for (var k in hds) {
            const keyValues = hds[k].split(": ");
            if (keyValues.length == 2)
              responseHeaders.push({
                key: keyValues[0].trim(),
                value: keyValues[1].trim(),
              });
          }
        }
      }),
      map((r) => r.response),
      catchError((error: AjaxError) => {
        if (error?.response?.errors) {
          const msg = error.response.errors
            .map((er: any) => er.errorMessage)
            .join("\n");
          throw new Error(msg);
        }
        if (error?.response?.message) throw new Error(error.response.message);
        if (error?.message) throw new Error(error.message);
        throw new Error("Unhandled Error!");
      })
    );
  }
}

export type RequestConfig = {
  body?: any;
  params?: {};
  query?: {};
  headers?: {};
  log?: boolean;
  request?: AjaxRequest;
};
