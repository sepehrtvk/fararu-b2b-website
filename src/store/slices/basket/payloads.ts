import {
  ProductModel,
  ProductUnit,
  ProductUnitModel,
} from '../../../api/product/types';

export interface BasketSyncFaildPayload {
  error: string;
}

export interface UpdateBasketItemPayload {
  product: ProductModel;
  qty: number;
  unitInfo: ProductUnitModel;
  batchNo: string | undefined;
  batchNoId: number | undefined;
}
