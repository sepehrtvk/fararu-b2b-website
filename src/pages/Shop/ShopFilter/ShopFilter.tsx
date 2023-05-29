import React, { useState } from "react";
import styles from "./ShopFilter.module.css";

//icons
import search from "../../../assets/img/search.svg";
import { Checkbox, Switch } from "@mui/material";

const ShopFilter = ({ filtered, filterHandler }: any) => {
  const [filterMenu, setFilterMenu] = useState(false);

  const filterMenuHandler = () => {
    setFilterMenu(!filterMenu);
  };

  return (
    <>
      <div className={filterMenu ? styles.filterOpen : "mt-5"}>
        <div className={styles.field}>
          <p className='fs-5'>دسته بندی نتایج </p>
          <div className={styles.category}>
            <ul>
              <li id='category مراقبت و زیبایی' onClick={filterHandler}>
                مراقبت و زیبایی
              </li>
              <li id='category مواد شوینده' onClick={filterHandler}>
                مواد شوینده
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.field}>
          <p className='fs-5'>جستجو </p>
          <div className={styles.searchBox}>
            <input
              type='text'
              className={styles.search}
              name='search'
              placeholder='نام محصول مورد نظر'
              value={filtered.search}
              onChange={filterHandler}
            />
            <img src={search} alt='search' className={styles.searchIcon} />
          </div>
        </div>
        <div className={styles.field}>
          <p className='fs-5'>برند </p>
          <div className={styles.searchBox}>
            <input
              type='text'
              className={styles.search}
              name='search'
              placeholder='نام برند مورد نظر'
              value={filtered.search}
              onChange={filterHandler}
            />
            <img src={search} alt='search' className={styles.searchIcon} />
          </div>
          <div className='d-flex align-items-center '>
            <Checkbox checked={true} />
            <div className='flex-fill d-flex align-items-center justify-content-between'>
              <span className='text-dark'>پرسیل</span>
              <span className='text-info'>Persil</span>
            </div>
          </div>
          <div className='d-flex align-items-center '>
            <Checkbox checked={false} />
            <div className='flex-fill d-flex align-items-center justify-content-between'>
              <span className='text-dark'>پرسیل</span>
              <span className='text-info'>Persil</span>
            </div>
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <Switch />
          <span>فقط کالاهای موجود</span>
        </div>
      </div>
      <div className={styles.buttonFilter} onClick={filterMenuHandler}>
        <div>
          فیلتر
          <i className='fas fa-filter'></i>
        </div>
      </div>
    </>
  );
};

export default ShopFilter;
