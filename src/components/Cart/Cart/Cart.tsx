import React from "react";
import CartProducts from "../CartProduct/CartProduct";
import { useAppSelector } from "../../../store/hooks";
import { selectBasketItemsAsList } from "../../../store/selectors";
import { BasketItem } from "../../../api/basket/types";
import CartPay from "../CartPay/CartPay";
import cartEmpty from "../../../assets/img/empty-cart.svg";

import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { toLocaleCurrencyString } from "../../../common/Localization";

const Cart = () => {
  const basketItems = useAppSelector((state) => selectBasketItemsAsList(state));

  const uniqueItems: BasketItem[] = [];

  basketItems.forEach((item) => {
    if (
      uniqueItems.findIndex((it) => it.product.code === item.product.code) < 0
    ) {
      uniqueItems.push(item);
    }
  });

  const cartIsEmpty = () => {
    return (
      <div className='container-fluid bg-light2 py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='card border-0 rounded-4'>
                <div className='card-body p-4'>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={cartEmpty} alt='trash' />
                    <h3>سبد خرید شما خالی است.</h3>
                    <Link to='/shop'>فروشگاه </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!basketItems.length) return cartIsEmpty();

  return (
    <div className='container-fluid bg-light2 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <h4 className='card-title mb-3'>سبد خرید شما</h4>
            <div className='card border-0 rounded-4'>
              <div className='card-body p-4'>
                <div className='d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom'>
                  <span>لیست محصولات منتخب شما</span>
                  <div>
                    <span>جمع کالاهای سفارش داده شده : </span>
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
                </div>
                {uniqueItems.map((product) => (
                  <CartProducts
                    key={product.product.productId}
                    productData={product.product}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='col-12 col-md-4'>
            <h4 className='card-title mb-3 mt-3 mt-md-0'>اطلاعات بیشتر</h4>
            <div className='card border-0 rounded-4'>
              <div className='card-body p-4'>
                <CartPay basketItems={basketItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
