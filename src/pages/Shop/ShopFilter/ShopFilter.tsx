import React, { useState } from "react";
import styles from "./ShopFilter.module.css";

//icons
import search from "../../../assets/img/search.svg";
import { Checkbox, Switch } from "@mui/material";
import { ProductModel } from "../../../api/product/types";
import Icon from "../../../components/Icon/Icon";

type FilterOptionType = {
  category?: string;
  brandNames?: [{ key: string; value: boolean }];
  isAvailable?: boolean;
};

type ShopFilterProps = {
  getFilteredProducts: (products: ProductModel[]) => void;
  products: ProductModel[];
};

const ShopFilter = ({ getFilteredProducts, products }: ShopFilterProps) => {
  const [filterMenu, setFilterMenu] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptionType>({});

  const filterMenuHandler = () => {
    setFilterMenu(!filterMenu);
  };

  const applyFilter = () => {
    let filteredProducts: ProductModel[] = [];

    //check product is available
    if (filterOptions.isAvailable) {
      filteredProducts = products.filter((p) => p.onHandQty > 0);
    }

    //check brandNames selection
    if (filterOptions.brandNames) {
      filterOptions.brandNames.map((bn) => {
        let tempProducts = filteredProducts.filter(
          (p) => p.brandName == bn.key && bn.value
        );
        filteredProducts.push(...tempProducts);
      });
    }

    //check category selection
    if (filterOptions.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.productGroupName == filterOptions.category
      );
    }

    getFilteredProducts(filteredProducts);
  };

  return (
    <>
      <div className={filterMenu ? styles.filterOpen : "mt-5"}>
        <div className={styles.field}>
          <p className='fs-5'>دسته بندی نتایج </p>
          <div className={styles.category}>
            <ul>
              <li
                id='1'
                onClick={() => {
                  setFilterOptions({
                    ...filterOptions,
                    category: "شامپو بزرگسال",
                  });
                }}>
                شامپو بزرگسال
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
          <Switch
            value={filterOptions.isAvailable}
            onClick={() => {
              setFilterOptions({
                ...filterOptions,
                isAvailable: !filterOptions.isAvailable,
              });
            }}
          />
          <span>فقط کالاهای موجود</span>
        </div>
      </div>
      <div>
        <span
          className='btn btn-primary w-100 rounded-3 text-white mt-4 d-flex justify-content-center'
          onClick={applyFilter}>
          <span>
            <Icon name='filter-square' size={5} color='white' />
          </span>
          <span className='me-3'> اعمال فیلتر</span>
        </span>
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
