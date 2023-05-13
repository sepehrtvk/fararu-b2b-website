export interface OrderHistoryModel {
  orderId: number;
  paymentTypeName: string;
  orderStateTitle: string;
  createdDateTime: string;
  description: string;
  paymentUsanceTitle: string;
  orderDate: string;
  trackingCode: number;
  itemsCount: number;
  productsCount: number;
  totalPrice: number;
  discountedAmount: number;
  payableAmount: number;
  discountAmount: number;
  addAmount: number;
  totalQty: number;
}

export interface OrderDetailModel {
  productId: number;
  isPrize: number;
  name: string;
  finalPrice: number;
  consumerUnitPrice: number;
  unitName: string;
}
