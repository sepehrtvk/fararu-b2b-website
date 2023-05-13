import { Action } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { catchError, filter, map, Observable, of, switchMap } from "rxjs";
import { postBasket } from "../../api/basket";
import { BasketModel } from "../../api/basket/types";
import {
  basketSyncFailed,
  basketSyncSuccess,
  deleteBasket,
  deleteBasketItem,
  updateBasketItem,
} from "../slices/basket";
import { store } from "../store";

export const updateBasketEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(
      (action) =>
        action.type == updateBasketItem.type ||
        action.type == deleteBasketItem.type
    ),
    switchMap(() => {
      const { CustomerId, CustomerGroupId } = store.getState().customer;
      const items = store.getState().basket.items;
      if (CustomerId) {
        const basketModel: BasketModel = {
          items: Object.values(items),
          CustomerGroupId,
          CustomerId,
        };
        return postBasket(basketModel).pipe(
          map(() => {
            return basketSyncSuccess();
          }),
          catchError((err: Error) => {
            return of(basketSyncFailed({ error: err.message }));
          })
        );
      } else return of(basketSyncFailed({ error: "Customer Id is null" }));
    })
  );

export const deleteBasketEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter((action) => action.type == deleteBasket.type),
    switchMap(() => {
      const { CustomerId, CustomerGroupId } = store.getState().customer;
      if (CustomerId) {
        const basket: BasketModel = {
          items: [],
          CustomerId,
          CustomerGroupId,
        };
        return postBasket(basket).pipe(
          map(() => {
            return basketSyncSuccess();
          }),
          catchError((err: Error) => {
            return of(basketSyncFailed({ error: err.message }));
          })
        );
      } else return of(basketSyncFailed({ error: "Customer Id is null" }));
    })
  );
