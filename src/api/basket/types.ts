import {ProductModel, ProductUnit, ProductUnitModel} from '../product/types';

export interface BasketItem {
  product: ProductModel;
  batchNo: string | undefined;
  batchNoId: number | undefined;
  qty: number;
  unitInfo: ProductUnitModel;
  isPrize: boolean | null;
}

export interface BasketModel {
  items: BasketItem[];
  CustomerId: number;
  CustomerGroupId: number | null | undefined;
}

export interface BasketFullDataModel {
  message: string ;
  items: BasketFullDataItem[];
  CustomerId: number;
  CustomerGroupId: number | null | undefined;
}

export interface PostBasketResultModel {
  message: string;
}

export interface CheckoutRequestBody {
  description?: string;
  CustomerId: number;
  CustomerGroupId: number | null | undefined;
  PaymentUsanceId: number | null;
}

export interface CheckoutResponseBody {
  success: boolean;
  trackingCode: string;
  errorMessage: string | null;
}

export interface BasketFullDataParameters {
  CustomerId: number;
  CustomerGroupId: number | null | undefined;
  IsPrizePreview: boolean;
  PaymentUsanceId: number | null;
}

export interface BasketFullDataItem {
  product: ProductModel;
  batchNo: string | undefined;
  batchNoId: number | undefined;
  qty: number;

  unitInfo: ProductUnitModel;
  isPrize: boolean | null;

  price: number;
  amount: number;
  discountAmount: number;
  addAmount: number;
  taxAmount: number;
  chargeAmount: number;
  netAmount: number;
  totalAmount: number;
  totalDiscountAmount: number;
  totalAddAmount: number;
  totalNetAmount: number;

  unitLabel: string;
}
