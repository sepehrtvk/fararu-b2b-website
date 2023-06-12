import React, { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import ShopFilter from "../ShopFilter/ShopFilter";
import ProductCard from "../../../components/ProductCard/ProductCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { ProductModel } from "../../../api/product/types";
import { getProducts } from "../../../api/product";
import { finalize } from "rxjs";
import notifyToast from "../../../components/toast/toast";
import ShopSort, { ShopSortTypes } from "../ShopSort/ShopSort";
import ShopProducts from "../ShopProducts/ShopProducts";
import { useLocation } from "react-router-dom";
import usePageBottom from "../../../hooks/usePageBottom";

const take: number = 12;

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [filtered, setFiltered] = useState({});

  const location = useLocation();
  const searchQuery = location.state as string;

  const isPageBottom = usePageBottom();

  useEffect(() => {
    if (searchQuery) runSearch(0);
    if (isPageBottom) runSearch(products.length);
    if (!isPageBottom && products.length == 0) runSearch(0);
  }, [searchQuery, isPageBottom]);

  const sortShopHandler = (sortType: ShopSortTypes) => {
    let productsCopy = [];
    if (filteredProducts.length > 0) {
      productsCopy = [...filteredProducts];
    } else {
      productsCopy = [...products];
    }
    let sortedProducts;

    if (sortType == "topSell") {
      sortedProducts = productsCopy.sort((p1, p2) =>
        p1.consumerUnitPrice < p2.consumerUnitPrice
          ? 1
          : p1.consumerUnitPrice > p2.consumerUnitPrice
          ? -1
          : 0
      );
    }
    if (sortType == "topNew") {
      sortedProducts = productsCopy.sort((p1, p2) =>
        p1.finalPrice > p2.finalPrice
          ? 1
          : p1.finalPrice < p2.finalPrice
          ? -1
          : 0
      );
    }

    if (sortedProducts) setProducts(sortedProducts);
  };

  const runSearch = (skip: number) => {
    if (!products.length) setIsLoading(true);
    else setIsLoadingMore(true);
    const subscription = getProducts({
      skip,
      take,
      searchQuery: searchQuery,
    })
      .pipe(
        finalize(() => {
          setIsLoading(false);
          setIsLoadingMore(false);
        })
      )
      .subscribe({
        next: (items) => {
          if (skip == 0) setProducts([...items]);
          else setProducts([...products, ...items]);
        },
        error: (err) => {
          notifyToast("error", { message: err.message });
        },
      });
    return () => subscription?.unsubscribe();
  };

  const getFilteredProducts = (products: ProductModel[]) => {
    setFilteredProducts(products);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='container'>
      <div className={styles.shopPage}>
        <aside className={styles.filterContainer}>
          <div className={styles.fiter}>
            <ShopFilter
              getFilteredProducts={getFilteredProducts}
              products={products}
            />
          </div>
        </aside>
        <main className={styles.mainContainer}>
          <ShopSort sortShopHandler={sortShopHandler} />
          <ShopProducts
            products={filteredProducts.length > 0 ? filteredProducts : products}
            isLoadingMore={isLoadingMore}
          />
        </main>
      </div>
    </div>
  );
};

export default Shop;
