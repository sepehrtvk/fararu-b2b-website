import React from "react";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductInfo from "./ProductInfo/ProductInfo";
import { ProductModel } from "../../api/product/types";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  const state = location.state;

  const product = state as ProductModel;
  return (
    <div className='container my-5'>
      <ProductDetails product={product} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductPage;
