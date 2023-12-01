import { map, Observable } from "rxjs";
import { Api } from "..";
import { store } from "../../store/store";

import { OrderDetailModel, OrderHistoryModel } from "./types";

export const getOrderHistory = (): Observable<OrderHistoryModel[]> => {
  const customerId = store.getState().customer.CustomerId;
  return new Api().get<OrderHistoryModel[]>("/api/PolOrders/CustomerOrders", {
    query: { customerId },
  });
};

export const getOrderDetailById = (
  orderId: string
): Observable<OrderDetailModel[]> => {
  return new Api().get<OrderDetailModel[]>(
    "/api/PolOrders/CustomerOrdersById",
    {
      query: { orderId },
    }
  );
};
