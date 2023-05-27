import React from "react";
import Banners from "./Banners/Banners";
import SpecialOffers from "./SpecialOfffers/SpecialOffers";
import AdvertiseBanners from "./AdvertiseBanners/AdvertiseBanners";
import LastOrders from "./LastOrders/LastOrders";
import OurBrands from "./OurBrands/OurBrands";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <div className='container'>
      <Banners />
      <Categories />
      <SpecialOffers />
      <AdvertiseBanners />
      <LastOrders />
      <OurBrands />
    </div>
  );
};

export default Home;
