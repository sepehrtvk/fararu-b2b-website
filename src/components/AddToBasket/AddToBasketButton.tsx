import React, { useEffect, useState } from "react";
import {
  ProductModel,
  ProductUnitModel,
  ProductBatchModel,
} from "../../api/product/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createbasketItemUniqueId,
  updateBasketItem,
} from "../../store/slices/basket";

import styles from "./AddToBasketButton.module.css";
import {
  convertNumbersToEnglish,
  toLocaleNumberString,
} from "../../common/Localization";
import Icon from "../Icon/Icon";

export interface AddButtonProps {
  product: ProductModel;
  unitInfo: ProductUnitModel;
  batch: ProductBatchModel | undefined;
}

const AddToBasketButton = ({ product, unitInfo, batch }: AddButtonProps) => {
  const dispatch = useAppDispatch();
  const basketItem = useAppSelector(
    (store) =>
      store.basket.items[
        createbasketItemUniqueId(product.productId, unitInfo.id, batch?.id)
      ]
  );

  const [totalQty, setTotalQty] = useState<number>(basketItem?.qty);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (basketItem?.qty) setTotalQty(basketItem?.qty);
  }, [basketItem?.qty]);

  const renderMinusBtn = () => {
    if (basketItem && basketItem.qty > 0) {
      return (
        <div
          className='btn m-0 p-0'
          onClick={() => {
            dispatch(
              updateBasketItem({
                product,
                batchNo: batch?.batchNo,
                batchNoId: batch?.id,
                qty: basketItem.qty - 1,
                unitInfo,
              })
            );
          }}>
          <Icon color='primary' size={2} name='file-minus' />
        </div>
      );
    }
  };

  if (basketItem === undefined || basketItem.qty == 0) {
    return (
      <button
        className='btn btn-primary text-white'
        onClick={() => {
          dispatch(
            updateBasketItem({
              product,
              batchNo: batch?.batchNo,
              batchNoId: batch?.id,
              qty: 1,
              unitInfo,
            })
          );
        }}>
        <div className='d-flex align-items-center'>
          <Icon color='white' size={4} name='cart-plus' />
          <span className='me-2'>{unitInfo.title}</span>
        </div>
      </button>
    );
  }

  return (
    <div className='d-flex align-items-center'>
      <span>{unitInfo.title}</span>
      <div
        className='btn m-0 p-0'
        onClick={() => {
          dispatch(
            updateBasketItem({
              product,
              batchNo: batch?.batchNo,
              batchNoId: batch?.id,
              qty: basketItem ? +basketItem.qty + 1 : 1,
              unitInfo,
            })
          );
        }}>
        <Icon color='primary' size={2} name='file-plus' />
      </div>
      <input
        className='form-control form-control-sm'
        value={toLocaleNumberString(totalQty)}
        maxLength={4}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            dispatch(
              updateBasketItem({
                product,
                batchNo: batch?.batchNo,
                batchNoId: batch?.id,
                qty: totalQty,
                unitInfo,
              })
            );
          }
        }}
        style={{ width: "45px", height: "45px", textAlign: "center" }}
        onChange={(text) => {
          const val = text.target.value;
          if (
            val.length != 0 &&
            Number.isInteger(+convertNumbersToEnglish(val))
          ) {
            setTotalQty(convertNumbersToEnglish(val));
          } else {
            setTotalQty(0);
          }
        }}
      />
      {renderMinusBtn()}
    </div>
  );

  return (
    <div className={styles.plusMinusProduct}>
      <button
        disabled={loading}
        className={styles.smallBtn}
        onClick={() => dispatch({ type: "PLUS_ONE", payload: { product } })}>
        <i className='fas fa-plus'></i>
      </button>
      <span className={styles.quantity}>{totalQty}</span>
      {totalQty === 1 && (
        <button
          disabled={loading}
          className={styles.trashBtn}
          onClick={() =>
            dispatch({
              type: "MINUS_ONE",
              payload: { product },
            })
          }>
          <i className='far fa-trash-alt'></i>
        </button>
      )}
      {totalQty > 1 && (
        <button
          disabled={loading}
          className={styles.smallBtn}
          onClick={() => dispatch({ type: "MINUS_ONE", payload: { product } })}>
          <i className='fas fa-minus'></i>
        </button>
      )}
    </div>
  );
};

export default AddToBasketButton;
