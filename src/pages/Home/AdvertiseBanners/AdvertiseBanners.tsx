import React from "react";
import adBanner from "../../../assets/banners/adBanner.png";

const AdvertiseBanners = () => {
  return (
    <div className='conatainer my-5'>
      <div className='row'>
        <div className='col-md-6 col-12 text-center'>
          <img src={adBanner} alt='adBanner' className='img-fluid rounded-4' />
        </div>
        <div className='col-md-6 col-12 text-center'>
          <img
            src={adBanner}
            alt='adBanner'
            className='img-fluid mt-3 mt-md-0 rounded-4'
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertiseBanners;
