import React from "react";
import { ProductModel } from "../../../api/product/types";
//Styles
import styles from "./ProductInfo.module.css";
import { Box, Tabs, Tab, Typography, createTheme } from "@mui/material";
import productFeature from "../../../assets/icons/productFeature.svg";
import productDescription from "../../../assets/icons/productDescription.svg";
import { toLocaleNumberString } from "../../../common/Localization";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type ProductInfoProps = { product: ProductModel };

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const tableRow = (key: string, value: string) => {
    return (
      <>
        <div className='col-6 mb-3'>
          <div className='py-2 px-4 bg-light rounded-2'>
            <p className='fs-5 mb-0'>{key} </p>
          </div>
        </div>
        <div className='col-6 mb-3'>
          <div className='py-2 px-4 bg-light rounded-2'>
            <p className='fs-5 mb-0 text-dark '>{value}</p>
          </div>
        </div>
      </>
    );
  };

  const productDetails = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 mt-4'>
            <p className='fs-4 fw-bold'>مشخصات کلی </p>
          </div>

          {tableRow("کد کالا", toLocaleNumberString(product.code))}
          {tableRow("برند", product.brandName)}

          <div className='col-12 mt-4'>
            <p className='fs-4 fw-bold'>اطلاعات محصول </p>
          </div>

          {tableRow("گروه کالا", product.productGroupPathName)}
          {tableRow("واحد فروش", product.unitName)}
          {tableRow(
            "حجم کوچکترین واحد",
            product.volume ? product.volume : "---"
          )}
          {tableRow("وزن کوچکترین واحد", product.weight)}
          {tableRow("تولید کننده", product.manufacturerName)}
        </div>
      </div>
    );
  };

  const productDesc = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 mt-4'>
            <p className='fs-4 fw-bold'>توضیحات </p>
          </div>
          <div className='col-12 mb-3'>
            <div className='py-2 px-4 bg-light rounded-2'>
              <p className='fs-5 mb-0'>
                {product.description ? product.description : "---"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='border border-2 rounded-4 mt-5'>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          indicatorColor='secondary'
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab
            icon={<img className='ms-2' src={productFeature} alt='ong' />}
            iconPosition='start'
            classes={{
              root: "fs-6 fw-bold",
            }}
            color='secondary'
            label='ویژگی محصول'
            {...a11yProps(0)}
          />
          <Tab
            icon={<img className='ms-2' src={productDescription} alt='ong' />}
            iconPosition='start'
            classes={{
              root: "fs-6 fw-bold",
            }}
            color='secondary'
            label='توضیحات محصول'
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {productDetails()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {productDesc()}
      </TabPanel>
    </div>
  );
};

export default ProductInfo;
