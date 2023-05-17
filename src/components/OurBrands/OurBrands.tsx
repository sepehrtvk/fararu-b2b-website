import React from "react";

//Brands icon
import adidas from "../../assets/img/adidas.svg";
import nike from "../../assets/img/nike.svg";
import puma from "../../assets/img/puma.svg";
import zara from "../../assets/img/zara.svg";

//Styles
import styles from "./OurBrands.module.css";

const OurBrands = () => {
  return (
    <div className='carousel-slider my-5'>
      <div className='title-homepage'>
        <h2>برند های ما</h2>
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
