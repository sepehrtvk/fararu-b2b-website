import React from "react";

//Styles
import styles from "./CartProduct.module.css";

import noImage from "../../../assets/img/no-image.jpeg";
import AddToBasket from "../../../components/AddToBasket/AddToBasket";
import PriceBadge from "../../../components/PriceBadge/PriceBadge";

const CartProduct = ({ productData, isPreview, preview }: any) => {
  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <div className={styles.image}>
          {!productData.image || productData.image.includes("///") ? (
            <img src={noImage} alt='productImage' />
          ) : (
            <img src={productData.image} alt={productData.name} />
          )}
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
