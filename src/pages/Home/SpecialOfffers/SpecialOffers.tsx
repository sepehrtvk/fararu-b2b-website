//Swiper
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEffect, useState } from "react";
import { ProductModel } from "../../../api/product/types";
import { getProducts } from "../../../api/product";
import notifyToast from "../../../components/toast/toast";
import ProductCard from "../../../components/ProductCard/ProductCard";

const SpecialOffers = () => {
  const [specialPro, setspecialPro] = useState<ProductModel[]>([]);

  useEffect(() => {
    const subscription = getProducts().subscribe({
      next: setspecialPro,
      error: (err) => {
        notifyToast("error", { message: err.message });
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='carousel-slider'>
      <div className='title-homepage'>
        <h2>پیشنهادات ویژه</h2>
        <small>Special offers</small>
      </div>
      <Swiper
        breakpoints={{
          990: {
            width: 990,
            slidesPerView: 3,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
          360: {
            width: 350,
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
        }}
        spaceBetween={40}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}>
        {specialPro &&
          specialPro.map((product) => (
            <SwiperSlide key={product.productId}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SpecialOffers;
