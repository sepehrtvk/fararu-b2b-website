import React, { useEffect, useState } from "react";
import SwiperComponent from "../../../components/Swiper/SwiperComponent";
import { ProductModel } from "../../../api/product/types";
import { getProducts } from "../../../api/product";
import notifyToast from "../../../components/toast/toast";

const LastOrders = () => {
  const [lastProducts, setLastProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const subscription = getProducts().subscribe({
      next: setLastProducts,
      error: (err) => {
        notifyToast("error", { message: err.message });
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='carousel-slider my-5'>
      <div className='title-homepage'>
        <h2>سفارشات اخیر</h2>
      </div>
      <SwiperComponent products={lastProducts} />
    </div>
  );
};

export default LastOrders;
