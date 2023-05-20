import React from "react";
import { useNavigate } from "react-router-dom";
//Styles
import styles from "./CartPay.module.css";
import {
  toLocaleCurrencyString,
  toLocaleNumberString,
} from "../../../common/Localization";
import { BasketItem } from "../../../api/basket/types";

type CartPayProps = {
  basketItems: BasketItem[];
};

const CartPay = ({ basketItems }: CartPayProps) => {
  const navigate = useNavigate();

  const uniqueItems: BasketItem[] = [];

  basketItems.forEach((item) => {
    if (
      uniqueItems.findIndex((it) => it.product.code === item.product.code) < 0
    ) {
      uniqueItems.push(item);
    }
  });

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom'>
        <span>تعداد کالاهای سفارش داده شده : </span>
        <span>
          <span className='fw-bold fs-5 ms-1'>
            {toLocaleNumberString(uniqueItems.length)}
          </span>
          <span>مورد</span>
        </span>
      </div>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <span>مجموع قیمت کالاهای شما : </span>
        <span className='fw-bold fs-5'>
          {toLocaleCurrencyString(
            basketItems
              .map(
                (item) =>
                  item.product.finalPrice *
                  item.qty *
                  item.unitInfo.convertFactor
              )
              .reduce((price, total) => total + price),
            true
          )}
        </span>
      </div>

      <button
        className='btn btn-outline-primary w-100 rounded-3 fw-bold py-2 text-danger-hover'
        onClick={() => {
          navigate("/preview");
        }}>
        پیش نمایش
      </button>
    </div>
  );
};

export default CartPay;
