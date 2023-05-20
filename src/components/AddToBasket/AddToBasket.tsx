import {
  ProductModel,
  ProductBatchModel,
  ProductTypeId,
} from "../../api/product/types";
import { AppConfig } from "../../common/app-config";
import { useAppSelector } from "../../store/hooks";
import AddToBasketButton from "./AddToBasketButton";

import styles from "./AddToBasket.module.css";

export interface AddButtonProps {
  product: ProductModel;
  batch?: ProductBatchModel;
  vertical?: boolean;
}

const AddToBasket = ({ product, batch, vertical }: AddButtonProps) => {
  const customerId = useAppSelector((state) => state.customer.CustomerId);
  if (customerId == null) return null;

  if (AppConfig.stock.checkOnHandQty && product.onHandQty <= 0) return null;

  if (product.consumerUnitPrice <= 0 || product.finalPrice <= 0) return null;
  else {
    if (product.unitTypeId == ProductTypeId.DoubleUnit) {
      let smallerUnit = null;
      let largerUnit = null;
      if (product.sellUnit && product.sellUnit2) {
        if (
          product.sellUnit?.convertFactor < product.sellUnit2?.convertFactor
        ) {
          smallerUnit = product.sellUnit;
          largerUnit = product.sellUnit2;
        } else {
          smallerUnit = product.sellUnit2;
          largerUnit = product.sellUnit;
        }
      }
      return (
        <div
          className={
            vertical ? styles.verticalContainer : styles.horizontalContainer
          }>
          {smallerUnit && (
            <div className={vertical ? "mb-2" : styles.unitContainerStyle}>
              <AddToBasketButton
                product={product}
                unitInfo={smallerUnit}
                batch={batch}
              />
            </div>
          )}
          {largerUnit && (
            <div className={vertical ? "" : styles.unitContainerStyle}>
              <AddToBasketButton
                product={product}
                unitInfo={largerUnit}
                batch={batch}
              />
            </div>
          )}
        </div>
      );
    } else if (
      product.unitTypeId == ProductTypeId.SingleUnit &&
      product.sellUnit != null
    ) {
      return (
        <div className={styles.unitContainerStyle}>
          <AddToBasketButton
            product={product}
            unitInfo={product.sellUnit}
            batch={batch}
          />
        </div>
      );
    } else return null;
  }
};

export default AddToBasket;
