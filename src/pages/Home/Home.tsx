import React from "react";
import Banners from "./Banners/Banners";
import SpecialOffers from "./SpecialOfffers/SpecialOffers";
import AdvertiseBanners from "./AdvertiseBanners/AdvertiseBanners";
import LastOrders from "./LastOrders/LastOrders";
import OurBrands from "../../components/OurBrands/OurBrands";

const Home = () => {
  return (
    <div className='container'>
      <Banners />
      <SpecialOffers />
      <AdvertiseBanners />
      <LastOrders />
      <OurBrands />
    </div>
  );
};

export default Home;
