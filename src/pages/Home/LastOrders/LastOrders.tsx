import React, { useEffect, useState } from "react";
import SwiperComponent from "../../../components/Swiper/SwiperComponent";
import { ProductModel } from "../../../api/product/types";
import { getProducts } from "../../../api/product";
import notifyToast from "../../../components/toast/toast";
import Icon from "../../../components/Icon/Icon";

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
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex align-items-center'>
          <Icon name='star' size={2} color='primary' />
          <h3 className='fw-bold me-2 mb-0'>سفارشات اخیر</h3>
        </div>
        <div className='btn btn-light d-flex'>
          <span className='ms-2'>موارد بیشتر</span>
          <span>
            <Icon name='arrow-left-short' size={5} color='black' />
          </span>
        </div>
      </div>
      <SwiperComponent products={lastProducts} />
    </div>
  );
};

export default LastOrders;
