import React from "react";
import { ProductModel } from "../../../api/product/types";
import noImage from "../../../assets/img/no-image.jpeg";

//Styles
import styles from "./ProductDetails.module.css";
import AddToBasket from "../../../components/AddToBasket/AddToBasket";
type ProductDetailsProps = { product: ProductModel };

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className={styles.productDetails}>
      <div className={styles.productImage}>
        {!product.image || product.image.includes("///") ? (
          <img src={noImage} alt='productImage' />
        ) : (
          product.image && <img src={product.image} alt='productImage' />
        )}

        <span className={styles.addToFavorite}>
          <i className='fas fa-heart'></i>
        </span>
        <span className={styles.share}>
          <i className='fas fa-share-alt'></i>
        </span>
      </div>
      <div className={styles.details}>
        <div className={styles.rightDetails}>
          <h2 className={styles.title}>{product.name}</h2>
          <small className={styles.category}>{product.productGroupName}</small>
          <div style={{ marginTop: "15px" }}>
            <span>موجودی : </span>
            <span>{product.onHandQty.toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.leftDetails}>
          <div className={styles.buy}>
            <div className={styles.price}>
              <p>قیمت :</p>
              <p>{product.finalPrice.toLocaleString()}</p>
            </div>
            <div className={styles.discount}>
              <p>تخفیف :</p>
              <p>{product.consumerUnitPrice} %</p>
            </div>
            <div className={styles.totalPrice}>
              <p>قیمت با احتساب تخفیف :</p>
              <p>{product.finalPrice}</p>
            </div>
            <div>
              <AddToBasket product={product} vertical={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
