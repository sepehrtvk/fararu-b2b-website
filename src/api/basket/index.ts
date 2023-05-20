import { map, Observable } from "rxjs";

import { Api, ReponseHeader } from "..";
import { store } from "../../store/store";
import {
  BasketFullDataModel,
  BasketFullDataParameters,
  BasketModel,
  CheckoutRequestBody,
  CheckoutResponseBody,
  PostBasketResultModel,
} from "./types";
import i18n from "i18next";
import { AppConfig } from "../../common/app-config";

export const postBasket = (
  basket: BasketModel
): Observable<PostBasketResultModel> => {
  return new Api().post<PostBasketResultModel>("api/BasketPolNo/Post", {
    body: basket,
  });
};

export const getBasket = (): Observable<BasketModel[]> => {
  const { CustomerId, CustomerGroupId } = store.getState().customer;
  return new Api().get<BasketModel[]>("api/BasketPolNo/Get", {
    query: { CustomerId, CustomerGroupId },
  });
};

export const checkout = (
  body: CheckoutRequestBody
): Observable<CheckoutResponseBody> =>
  new Api().post("api/BasketPolNo/CheckOut", { body, log: true });

export const getBasketFullData = (
  query: BasketFullDataParameters
): Observable<BasketFullDataModel> => {
  const headers: ReponseHeader[] = [];
  const result = new Api()
    .get<BasketFullDataModel>(
      "api/BasketPolNo/GetBasketFullData",
      {
        query,
      },
      headers
    )
    .pipe(
      map((response) => {
        response.items = response.items.map((item) => {
          const url = item.product.image;
          if (url) {
            item.product.image = getFullImagePath(url);
          }
          return item;
        });

        const diffPrice = headers.find(
          (h) => h.key == "hasdiffrentprice" && h.value == "1"
        );
        if (diffPrice) {
          return { ...response, message: i18n.t("price_changed") };
        } else {
          return response;
        }
      })
    );
  return result;
};

const getFullImagePath = (imageUrl: string) => {
  return AppConfig.api.server.url + ":" + AppConfig.api.server.port + imageUrl;
};
