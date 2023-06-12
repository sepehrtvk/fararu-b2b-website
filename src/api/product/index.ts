import { map, Observable } from "rxjs";
import { Api } from "..";
import { getOriginFromUrl } from "../../common/url";
import { store } from "../../store/store";
import {
  ProductBatchModel,
  ProductBrandsModel,
  ProductGroupModel,
  ProductModel,
  ProductTypeId,
} from "./types";

export interface ProductsRequestOptions {
  skip: number;
  take: number;
  sortType?: string;
  menuItemId?: string;
  isSpecial?: boolean;
  searchQuery?: string;
  showInMainPage?: boolean;
}

type ProductApiResult = {
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

  smallUnitId: number;
  smallUnitTitle: string;
  smallUnitQty: number;
  largeUnitId: number;
  largeUnitTitle: string;
  largeUnitQty: number;

  barcode: string;
  productGroupName: string;
  productGroupPathName: string;
  description: string;
  weight: string;
  hasBatch: boolean;

  unitId: number | null;
  unitName: string;
  orderCountStep: number;

  unitId2: number | null;
  unitName2: string;
  orderCountStep2: number;

  isAvailableInShop: number;
  packQty: number;
  brandName: string;
  manufacturerName: string;
  volume: string;
  sellUserPrice: number;
};

export const getProducts = (
  options?: ProductsRequestOptions
): Observable<ProductModel[]> => {
  const { CustomerId, CustomerGroupId, DcRef } = store.getState().customer;
  const request: any = {};
  const parameters = {
    CustomerId,
    CustomerGroupId,
    DcRef,
  };
  return new Api()
    .get<ProductApiResult[]>("api/PolProductsNo/get", {
      query: options,
      params: parameters,
      request,
    })
    .pipe(
      map((response: ProductApiResult[]) => {
        const origin = getOriginFromUrl(request.url);
        return response.map((item) => {
          return {
            productId: item.productId,
            code: item.code,
            name: item.name,
            finalPrice: item.finalPrice,
            consumerUnitPrice: item.consumerUnitPrice,
            unitTypeId: item.unitTypeId,
            image: item.image ? origin + item.image : null,
            isPrize: item.isPrize,
            onHandQty: item.onHandQty,
            onHandQtyLabel: item.onHandQtyLabel,
            sellUnit:
              item.unitId == null
                ? null
                : {
                    id: item.unitId,
                    title: item.unitName,
                    convertFactor: item.orderCountStep,
                  },
            sellUnit2:
              item.unitId2 == null
                ? null
                : {
                    id: item.unitId2,
                    title: item.unitName2,
                    convertFactor: item.orderCountStep2,
                  },
            smallUnit: {
              id: item.smallUnitId,
              title: item.smallUnitTitle,
              convertFactor: item.smallUnitQty,
            },
            largeUnit: {
              id: item.largeUnitId,
              title: item.largeUnitTitle,
              convertFactor: item.largeUnitQty,
            },
            barcode: item.barcode,
            productGroupName: item.productGroupName,
            productGroupPathName: item.productGroupPathName,
            description: item.description,
            weight: item.weight,
            hasBatch: item.hasBatch,
            isAvailableInShop: item.isAvailableInShop == 1,
            unitName: item.unitName,
            packQty: item.packQty,
            brandName: item.brandName,
            manufacturerName: item.manufacturerName,
            volume: item.volume,
            sellUserPrice: item.sellUserPrice,
          };
        });
      })
    );
};

export const getProductGroups = (): Observable<ProductGroupModel[]> => {
  const request: any = {};
  return new Api()
    .get<ProductGroupModel[]>("api/PolProductGroupsNo/get", {
      log: false,
      request,
    })
    .pipe(
      map((result: ProductGroupModel[]) => {
        const origin = getOriginFromUrl(request.url);
        appendOriginToImageUrl(result, origin);
        return result;
      })
    );
};

const appendOriginToImageUrl = (items: ProductGroupModel[], origin: string) => {
  for (const item of items) {
    if (item.submenus && item.submenus.length > 0) {
      appendOriginToImageUrl(item.submenus, origin);
    }
    item.imageUrl = item.mediumURL ? origin + "/" + item.mediumURL : null;
  }
};

export const getProductBatches = (productId: string) =>
  new Api().get<ProductBatchModel[]>("api/PolProductsNo/GetBatch", {
    query: { productId },
  });

export const getProductBrands = (options?: ProductsRequestOptions) =>
  new Api().get<ProductBrandsModel[]>("api/PolProductsNo/GetBrand", {
    query: options,
  });
