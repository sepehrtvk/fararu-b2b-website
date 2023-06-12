import React, { useEffect, useState } from "react";
import styles from "./ShopFilter.module.css";

//icons
import search from "../../../assets/img/search.svg";
import { Checkbox, Switch } from "@mui/material";
import { ProductBrandsModel, ProductModel } from "../../../api/product/types";
import Icon from "../../../components/Icon/Icon";
import { getProductBrands } from "../../../api/product";
import { finalize } from "rxjs";
import notifyToast from "../../../components/toast/toast";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

type FilterOptionType = {
  category?: string;
  brandNames?: string[];
  isAvailable?: boolean;
};

type ShopFilterProps = {
  getFilteredProducts: (products: ProductModel[]) => void;
  products: ProductModel[];
};

const ShopFilter = ({ getFilteredProducts, products }: ShopFilterProps) => {
  const [filterMenu, setFilterMenu] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptionType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<ProductBrandsModel[]>([]);
  const [activeBrands, setActiveBrands] = useState<ProductBrandsModel[]>([]);

  const filterMenuHandler = () => {
    setFilterMenu(!filterMenu);
  };

  useEffect(() => {
    setIsLoading(true);
    getProductBrands()
      .pipe(finalize(() => setIsLoading(false)))
      .subscribe({
        next: setBrands,
        error: (err: Error) => {
          notifyToast("error", { message: err.message });
        },
      });
  }, []);

  const applyFilter = () => {
    let filteredProducts: ProductModel[] = [...products];

    //check product is available
    if (filterOptions.isAvailable) {
      filteredProducts = filteredProducts.filter((p) => p.onHandQty > 0);
    }

    //check brandNames selection
    if (filterOptions.brandNames) {
      let tempProducts: ProductModel[] = [];
      filterOptions.brandNames.map((bn) => {
        const tempp = filteredProducts.filter((p) => p.brandName == bn);
        tempProducts.push(...tempp);
      });
      filteredProducts = tempProducts;
    }
    console.log(filteredProducts);

    //check category selection
    if (filterOptions.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.productGroupName == filterOptions.category
      );
    }

    getFilteredProducts(filteredProducts);
  };

  const renderBrands = () => {
    return (
      <div className='mt-1' style={{ maxHeight: "200px", overflow: "scroll" }}>
        {brands.map((brandItem) => {
          return (
            <div key={brandItem.id} className='d-flex align-items-center '>
              <Checkbox
                onClick={() => {
                  const activeIndex = activeBrands.findIndex(
                    (ab) => ab.id == brandItem.id
                  );
                  const activeBrandsCopy = [...activeBrands];

                  if (activeIndex > -1) {
                    activeBrandsCopy.splice(activeIndex, 1);
                    setActiveBrands(activeBrandsCopy);
                  } else {
                    setActiveBrands([...activeBrands, brandItem]);
                    activeBrandsCopy.push(brandItem);
                  }
                  setFilterOptions({
                    ...filterOptions,
                    brandNames: activeBrandsCopy.map((ab) => ab.brandName),
                  });
                }}
              />
              <div className='flex-fill d-flex align-items-center justify-content-between'>
                <span className='text-dark'>{brandItem.brandName}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) return <LoadingSpinner />;

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
              <li
                id='2'
                onClick={() => {
                  setFilterOptions({
                    ...filterOptions,
                    category: "پودر لباسشویی",
                  });
                }}>
                پودر لباسشویی
              </li>
              <li
                id='3'
                onClick={() => {
                  setFilterOptions({
                    ...filterOptions,
                    category: "محصولات ماشین ظرفشویی",
                  });
                }}>
                محصولات ماشین ظرفشویی
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

          {renderBrands()}
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
