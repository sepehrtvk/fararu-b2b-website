import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerItem, getBannerItems } from "../../../api/banner";
import notifyToast from "../../../components/toast/toast";
import { Autoplay, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//Styles
import styles from "./Banners.module.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { finalize } from "rxjs";

const Banners = () => {
  const [banners, setbanners] = useState<BannerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = getBannerItems()
      .pipe(finalize(() => setIsLoading(false)))
      .subscribe({
        next: (items) => setbanners(items),
        error: (err) => {
          notifyToast("error", { message: err.message });
        },
      });
    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='container'>
      <Swiper
        className='slider mb-5'
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}>
        {banners.map((banner) => (
          <SwiperSlide>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={banner.image} className={styles.image} alt='slider' />
            </div>
            <p
              style={{
                textAlign: "center",
                paddingTop: "10px",
                paddingBottom: "15px",
              }}>
              {banner.title}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banners;
