import React from "react";

//Brands icon
import pril from "../../../assets/brands/pril.png";
import persil from "../../../assets/brands/persil.png";
import shawma from "../../../assets/brands/shawma.png";
import tazh from "../../../assets/brands/tazh.png";
import saaf from "../../../assets/brands/saaf.png";

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
          <img src={pril} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={persil} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={shawma} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={tazh} alt='brands' />
        </div>
        <div className={styles.image}>
          <img src={saaf} alt='brands' />
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
