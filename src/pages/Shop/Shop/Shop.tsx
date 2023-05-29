import React, { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import ShopFilter from "../ShopFilter/ShopFilter";
import ProductCard from "../../../components/ProductCard/ProductCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { ProductModel } from "../../../api/product/types";
import { getProducts } from "../../../api/product";
import { finalize } from "rxjs";
import notifyToast from "../../../components/toast/toast";
import ShopSort from "../ShopSort/ShopSort";

const Shop = () => {
  //   const categoryParams = useParams().category;
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filtered, setFiltered] = useState({
    sortBy: "date",
    search: "",
    category: "",
    fromPrice: 0,
    toPrice: 999999999,
  });
  let newProducts = products;

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

  //Filters function
  const shopFilterProducts = (state: any) => {};

  shopFilterProducts(filtered);

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

  return (
    <div className='container'>
      <div className={styles.shopPage}>
        <aside className={styles.filterContainer}>
          <div className={styles.fiter}>
            <ShopFilter filtered={filtered} filterHandler={filterHandler} />
          </div>
        </aside>
        <main className={styles.mainContainer}>
          <ShopSort />
          <div className={newProducts.length > 0 ? styles.products : ""}>
            {newProducts.length > 0 ? (
              newProducts.map((product) => (
                <ProductCard product={product} key={product.productId} />
              ))
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
