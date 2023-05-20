import React from "react";
import styles from "./PreviewProduct.module.css";
import { BasketFullDataItem } from "../../../api/basket/types";
import noImage from "../../../assets/img/no-image.jpeg";

type PreviewProductProps = {
  previewItem: BasketFullDataItem;
};
const PreviewProduct = ({ previewItem }: PreviewProductProps) => {
  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <div className={styles.image}>
          {previewItem.product.image && (
            <img
              src={previewItem.product.image}
              alt={previewItem.product.name}
            />
          )}
          {!previewItem.product.image && (
            <img src={noImage} alt='productImage' />
          )}
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{previewItem.product.name}</h3>
          <small className={styles.sizeOrColo}>
            {previewItem.product.productGroupName}
          </small>
          <div className={styles.prices}>
            <p className={styles.newPrice}>
              <span>قابل پرداخت :‌ </span>
              {previewItem.totalNetAmount.toLocaleString()} <span>تومان</span>
            </p>
          </div>
        </div>
        <div className={styles.extra}>
          <div>
            <span>کد کالا : </span>
            <span className={styles.extraColor}>
              {previewItem.product.code.toLocaleString()}
            </span>
          </div>
          <div style={{ marginTop: "9px" }}>
            <span>تعداد : </span>
            <span style={{ marginLeft: "9px" }}>{previewItem.qty}</span>
            <span className={styles.extraColor}>
              ({previewItem.unitInfo.title})
            </span>
          </div>
        </div>
        <div className={styles.extra}>
          <div>
            <span>قیمت واحد : </span>
            <span className={styles.extraColor}>
              {previewItem.price.toLocaleString()}
            </span>
          </div>
          <div style={{ marginTop: "9px" }}>
            <span>تخفیف : </span>
            <span className={styles.extraColor}>
              {previewItem.totalDiscountAmount}
            </span>
          </div>
        </div>
        <div className={styles.extra}>
          <div>
            <span>مبلغ ناخالص : </span>
            <span className={styles.extraColor}>
              {previewItem.totalAmount.toLocaleString()}
            </span>
          </div>
          <div style={{ marginTop: "9px" }}>
            <span>اضافه : </span>
            <span className={styles.extraColor}>
              {previewItem.totalAddAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewProduct;
