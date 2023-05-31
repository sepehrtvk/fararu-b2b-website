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

const Shop = () => {
  //   const categoryParams = useParams().category;
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filtered, setFiltered] = useState({});

  useEffect(() => {
    const subscription = getProducts()
      .pipe(finalize(() => setIsLoading(false)))
      .subscribe({
        next: setProducts,
        error: (err) => {
          notifyToast("error", { message: err.message });
        },
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sortShopHandler = (sortType: ShopSortTypes) => {
    const productsCopy = [...products];
    let sortedProducts;

    if (sortType == "topSell") {
      sortedProducts = productsCopy.sort((p1, p2) =>
        p1.finalPrice < p2.finalPrice
          ? 1
          : p1.finalPrice > p2.finalPrice
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

  const filterHandler = (event: any) => {
    if (
      event.target.name === "search" ||
      event.target.name === "fromPrice" ||
      event.target.name === "toPrice"
    ) {
      console.log(event);
      setFiltered({ ...filtered, [event.target.name]: event.target.value });
    } else {
      setFiltered({
        ...filtered,
        [event.target.id.split(" ")[0]]: event.target.id.split(" ")[1],
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='container'>
      <div className={styles.shopPage}>
        <aside className={styles.filterContainer}>
          <div className={styles.fiter}>
            <ShopFilter filtered={filtered} filterHandler={filterHandler} />
          </div>
        </aside>
        <main className={styles.mainContainer}>
          <ShopSort sortShopHandler={sortShopHandler} />
          <ShopProducts products={products} />
        </main>
      </div>
    </div>
  );
};

export default Shop;
