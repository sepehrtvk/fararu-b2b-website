import React from "react";

//Brands icon
import adidas from "../../../assets/img/adidas.svg";
import nike from "../../../assets/img/nike.svg";
import puma from "../../../assets/img/puma.svg";
import zara from "../../../assets/img/zara.svg";

//Styles
import styles from "./OurBrands.module.css";
import Icon from "../../../components/Icon/Icon";

const OurBrands = () => {
  return (
    <div className='my-5 py-5'>
      <div className='d-flex justify-content-center align-items-center mb-5'>
        <div className='d-flex align-items-center'>
          <Icon name='x-diamond' size={2} color='primary' />
          <h3 className='fw-bold me-2 mb-0'>برند های ما</h3>
        </div>
      </div>
      <div className={styles.brands}>
        <div className={styles.image}>
          <img src={adidas} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={zara} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={puma} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={nike} alt='brands' />
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
