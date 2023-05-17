import React from "react";
import { Link } from "react-router-dom";
//Styles
import styles from "./ProductCard.module.css";
import { ProductModel } from "../../api/product/types";
import noImage from "../../assets/img/no-image.jpeg";

type ProductScreenProps = { product: ProductModel };

const ProductCard = ({ product }: ProductScreenProps) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.cardImage}>
        {!product.image || product.image.includes("///") ? (
          <img src={noImage} alt='photo' height={"260px"} />
        ) : (
          product.image && (
            <img src={product.image} alt='photo' height={"250px"} />
          )
        )}

        {product.finalPrice > 0 && (
          <span className={styles.finalPrice}>{product.finalPrice}%</span>
        )}
      </div>
      <div className={styles.cardTitle}>
        <h3>{product.name}</h3>
        <small>{product.productGroupName}</small>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.prieContainer}>
          <p className={product.finalPrice ? styles.oldPrice : styles.price}>
            <span>موجودی : </span>
            {product.onHandQty}
          </p>
          <p className={product.finalPrice ? styles.oldPrice : styles.price}>
            <span>قیمت : </span>
            {product.finalPrice.toLocaleString()} <span>تومان</span>
          </p>
          {product.finalPrice > 0 && (
            <p className={styles.price}>
              {product.consumerUnitPrice} <span>تومان</span>
            </p>
          )}
        </div>
      </div>
      <Link
        to={`/products/${product.productId}`}
        className={styles.productDetails}>
        مشاهده محصول
      </Link>
    </div>
  );
};

export default ProductCard;
