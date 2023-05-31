import React from "react";

//Styles
import styles from "./CartProduct.module.css";

import noImage from "../../../assets/img/no-image.jpeg";
import AddToBasket from "../../../components/AddToBasket/AddToBasket";
import PriceBadge from "../../../components/PriceBadge/PriceBadge";
import Icon from "../../../components/Icon/Icon";
import { useAppDispatch } from "../../../store/hooks";
import { ProductModel } from "../../../api/product/types";
import { deleteBasketItem } from "../../../store/slices/basket";

type CartProductProps = {
  product: ProductModel;
};

const CartProduct = ({ product }: CartProductProps) => {
  const dispatch = useAppDispatch();

  const deleteBasketItemHandler = () => {
    dispatch(deleteBasketItem(product));
  };

  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <div className={styles.image}>
          {!product.image || product.image.includes("///") ? (
            <img src={noImage} alt='productImage' />
          ) : (
            <img src={product.image} alt={product.name} />
          )}
        </div>
        <div>
          <div className='mb-2'>
            <span>{product.name}</span>
          </div>
          <PriceBadge
            highPrice={product.finalPrice}
            lowPrice={product.consumerUnitPrice}
          />
        </div>
      </div>
      <div className='d-flex align-items-center'>
        <AddToBasket product={product} />
        <span className='btn' onClick={deleteBasketItemHandler}>
          <Icon className='me-3' name='trash3-fill' color='danger' size={4} />
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
