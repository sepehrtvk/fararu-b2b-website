import React from "react";
import Banners from "./Banners/Banners";
import SpecialOffers from "./SpecialOfffers/SpecialOffers";

const Home = () => {
  return (
    <div className='container'>
      <p>banners</p>
      <Banners />
      <p>Special Products</p>
      <SpecialOffers />
    </div>
  );
};

export default Home;
