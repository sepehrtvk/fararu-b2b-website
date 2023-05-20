import React from "react";

//Styles
import styles from "./CartProduct.module.css";

import noImage from "../../../assets/img/no-image.jpeg";
import AddToBasket from "../../AddToBasket/AddToBasket";
import PriceBadge from "../../PriceBadge/PriceBadge";

const CartProduct = ({ productData, isPreview, preview }: any) => {
  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <div className={styles.image}>
          {productData.image && (
            <img src={productData.image} alt={productData.name} />
          )}
          {!productData.image && <img src={noImage} alt='productImage' />}
        </div>
        <div>
          <div className='mb-2'>
            <span>{productData.name}</span>
          </div>
          <PriceBadge
            highPrice={productData.finalPrice}
            lowPrice={productData.consumerUnitPrice}
          />
        </div>
      </div>
      <AddToBasket product={productData} />
    </div>
  );
};

export default CartProduct;
