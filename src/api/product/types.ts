export interface ProductModel {
  productId: string;
  code: number;
  name: string;
  finalPrice: number;
  consumerUnitPrice: number;
  unitTypeId: ProductTypeId;
  image: string | null;
  isPrize: boolean;
  onHandQty: number;
  onHandQtyLabel: string;
  sellUnit: ProductUnitModel | null;
  sellUnit2: ProductUnitModel | null;
  smallUnit: ProductUnitModel;
  largeUnit: ProductUnitModel | null;
  barcode: string;
  productGroupName: string;
  productGroupPathName: string;
  description: string;
  weight: string;
  hasBatch: boolean;
  isAvailableInShop: boolean;
  unitName: string;
  packQty: number;
  brandName: string;
  volume: string;
  manufacturerName: string;
  sellUserPrice: number;
}

export interface ProductBatchModel {
  id: number;
  dcId: number;
  stockId: number;
  productId: number;
  productCode: string;
  productName: string;
  batchNo: string;
  onHandQty: number;
}

export interface ProductGroupModel {
  title: string;
  imageUrl: string | null;
  mediumURL: string | null;
  id: string;
  submenus?: ProductGroupModel[] | null;
  parentId?: string;
  nLevel: number;
}
export interface ProductGroupTwoLevelModel {
  firstLevel: ProductGroupModel | null;
  secondLevel: ProductGroupModel[] | null;
}

export enum ProductTypeId {
  SingleUnit = "7df31ef0-b64f-442e-8436-26106b74b3fe",
  Bulk = "f8743892-6efc-4797-8339-ace2371894e0",
  DoubleUnit = "f13f1d61-8aee-43c7-b555-01ef18e25050",
}

export enum ProductUnit {
  SmallUnit = 0,
  LargeUnit = 1,
  OtherUnit = 2,
}

export interface ProductUnitModel {
  id: number;
  title: string;
  convertFactor: number;
}
