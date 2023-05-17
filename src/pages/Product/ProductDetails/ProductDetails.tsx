import React from "react";
import { ProductModel } from "../../../api/product/types";
import noImage from "../../../assets/img/no-image.jpeg";

//Styles
import styles from "./ProductDetails.module.css";
import AddToBasket from "../../../components/AddToBasket/AddToBasket";
import PriceBadge from "../../../components/PriceBadge/PriceBadge";
type ProductDetailsProps = { product: ProductModel };

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const productImage = () => {
    const srcImage =
      !product.image || product.image.includes("///") ? noImage : product.image;
    return (
      <div className={styles.productImage}>
        {
          <img
            className='w-100 rounded-4 border border-2'
            src={srcImage}
            alt='productImage'
          />
        }
      </div>
    );
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-5'>{productImage()}</div>
        <div className='col-12 col-md-7 mt-4 mt-md-3 py-2 py-md-4 d-flex flex-column  justify-content-between'>
          <div>
            <h2 className='fw-bold'>{product.name}</h2>
            <div className='d-flex align-items-center my-3'>
              <p className='ms-4'>
                <span>برند : ‌</span>
                <span className='text-primary'>{product.brandName}</span>
              </p>
              <p>
                <span>دسته بندی : ‌</span>
                <span className='text-primary'>{product.productGroupName}</span>
              </p>
            </div>
          </div>
          <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-center'>
            <PriceBadge
              highPrice={product.finalPrice}
              lowPrice={product.sellUserPrice}
            />
            <AddToBasket product={product} />
          </div>
        </div>
      </div>
    </div>
    // <div className={styles.productDetails}>
    //   <div className={styles.details}>

    //     <div className={styles.leftDetails}>
    //       <div className={styles.buy}>
    //         <div className={styles.price}>
    //           <p>قیمت :</p>
    //           <p>{product.finalPrice.toLocaleString()}</p>
    //         </div>
    //         <div className={styles.discount}>
    //           <p>تخفیف :</p>
    //           <p>{product.consumerUnitPrice} %</p>
    //         </div>
    //         <div className={styles.totalPrice}>
    //           <p>قیمت با احتساب تخفیف :</p>
    //           <p>{product.finalPrice}</p>
    //         </div>
    //         <div>
    //           <AddToBasket product={product} vertical={false} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductDetails;
