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
import SwiperComponent from "../../../components/Swiper/SwiperComponent";

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
    <div className='carousel-slider my-5'>
      <div className='title-homepage'>
        <h2>پیشنهادات ویژه</h2>
      </div>
      <SwiperComponent products={specialPro} />
    </div>
  );
};

export default SpecialOffers;
