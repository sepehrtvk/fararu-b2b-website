import React from "react";
import { ProductModel } from "../../../api/product/types";
import ProductCard from "../../../components/ProductCard/ProductCard";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

import styles from "./ShopProducts.module.css";
import { useTranslation } from "react-i18next";

type ShopProductsProps = {
  products: ProductModel[];
  isLoadingMore: boolean;
};
const ShopProducts = ({ products, isLoadingMore }: ShopProductsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={products.length > 0 ? styles.products : ""}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <div className='d-flex justify-content-center'>
            <span className='text-primary fw-bold'>{t("no_item_found")}</span>
          </div>
        )}
      </div>
      <div className='d-flex justify-content-center'>
        {isLoadingMore && <LoadingSpinner />}
      </div>
    </>
  );
};

export default ShopProducts;
