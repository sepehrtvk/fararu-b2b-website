import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketItem, BasketModel } from "../../../api/basket/types";
import { ProductModel } from "../../../api/product/types";
import { BasketSyncFaildPayload, UpdateBasketItemPayload } from "./payloads";

export const createbasketItemUniqueId = (
  productId: string,
  unitId: number,
  batchNoId: number | undefined
): string => {
  if (batchNoId) return productId + "-" + unitId + "-" + batchNoId;
  else return productId + "-" + unitId + "-" + "null";
};
export interface BasketState {
  items: {
    [itemUniqueId: string]: BasketItem;
  };
  basketSyncSuccess: boolean;
  basketSyncError: string | null;
}

const initialState: BasketState = {
  items: {},
  basketSyncSuccess: true,
  basketSyncError: null,
};
const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    updateBasketItem: (
      state,
      action: PayloadAction<UpdateBasketItemPayload>
    ) => {
      const {
        product: { productId },
        batchNo,
        batchNoId,
        unitInfo,
        qty,
      } = action.payload;
      const basketItemUniqueId = createbasketItemUniqueId(
        productId,
        unitInfo.id,
        batchNoId
      );
      const item: BasketItem = state.items[basketItemUniqueId];
      if (item) {
        if (qty > 0)
          state.items[basketItemUniqueId] = {
            ...action.payload,
            isPrize: false,
          };
        else delete state.items[basketItemUniqueId];
      } else {
        state.items[basketItemUniqueId] = { ...action.payload, isPrize: false };
      }
    },
    updateBasket: (state, action: PayloadAction<BasketModel>) => {
      const basketItems: BasketItem[] = action.payload.items.map((item) => ({
        product: item.product,
        batchNo: item.batchNo,
        batchNoId: item.batchNoId,
        qty: item.qty,
        unitInfo: item.unitInfo,
        isPrize: item.isPrize,
      }));
      const b: any = {};
      basketItems.forEach((item) => {
        b[
          createbasketItemUniqueId(
            item.product.productId,
            item.unitInfo.id,
            item.batchNoId
          )
        ] = item;
      });
      state.items = { ...b };
    },
    deleteBasket: (state) => {
      state.items = {};
      state.basketSyncSuccess = false;
      state.basketSyncError = null;
    },
    deleteBasketItem: (state, action: PayloadAction<ProductModel>) => {
      Object.keys(state.items).forEach((key) => {
        if (key.startsWith(action.payload.productId + "-"))
          delete state.items[key];
      });
      state.basketSyncSuccess = false;
      state.basketSyncError = null;
    },
    basketSyncSuccess: (state) => {
      state.basketSyncSuccess = true;
      state.basketSyncError = null;
    },
    basketSyncFailed: (
      state,
      action: PayloadAction<BasketSyncFaildPayload>
    ) => {
      state.basketSyncSuccess = false;
      state.basketSyncError = action.payload.error;
    },
  },
  extraReducers: {
    "customer/setCustomer": (state) => {
      state.items = {};
      state.basketSyncSuccess = false;
      state.basketSyncError = null;
    },
  },
});

export const {
  updateBasketItem,
  deleteBasket,
  deleteBasketItem,
  updateBasket,
  basketSyncFailed,
  basketSyncSuccess,
} = basketSlice.actions;
export default basketSlice.reducer;
