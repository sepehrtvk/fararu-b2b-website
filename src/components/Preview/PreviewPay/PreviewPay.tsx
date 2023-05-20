import React from "react";
import { BasketFullDataItem } from "../../../api/basket/types";
import {
  toLocaleCurrencyString,
  toLocaleNumberString,
} from "../../../common/Localization";

type PreviewPayProps = {
  previewItems: BasketFullDataItem[];
};
const PreviewPay = ({ previewItems }: PreviewPayProps) => {
  return (
    <div className=''>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <span>تعداد کالا</span>
        <span>
          <span className='fw-bold fs-5 ms-1'>
            {toLocaleNumberString(previewItems.length.toLocaleString())}
          </span>
          <span>مورد</span>
        </span>
      </div>

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <span>جمع اقلام</span>
        <span>
          <span className='fw-bold fs-5 ms-1'>
            {toLocaleNumberString(
              previewItems
                .map((item) => {
                  if (item.isPrize) return item.qty;
                  else return item.qty * item.unitInfo.convertFactor;
                })
                .reduce((a, b) => a + b)
            )}
          </span>
          <span>مورد</span>
        </span>
      </div>

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <span>اضافه </span>
        <span className='fw-bold fs-5'>
          {toLocaleCurrencyString(
            previewItems
              .map((item) => item.addAmount)
              .reduce((v1, v2) => v1 + v2),
            true
          )}
        </span>
      </div>

      <div className='d-flex justify-content-between align-items-center  mb-3 pb-3 border-bottom'>
        <span>تخفیف </span>
        <span className='fw-bold fs-5'>
          {toLocaleCurrencyString(
            previewItems
              .map((item) => item.discountAmount)
              .reduce((v1, v2) => v1 + v2),
            true
          )}
        </span>
      </div>

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <span>قابل پرداخت </span>
        <span className='fw-bold fs-5'>
          {toLocaleCurrencyString(
            previewItems
              .map((item) => item.netAmount)
              .reduce((price, total) => total + price),
            true
          )}
        </span>
      </div>

      <button
        className='btn btn-outline-primary w-100 rounded-3 fw-bold py-2'
        onClick={() => {
          // checkout({
          //   CustomerId: localStorage.getItem("CustomerId"),
          //   CustomerGroupId: localStorage.getItem("CustomerGroupId"),
          // })
          //   .then((res) => {
          //     dispatch({ type: "CHECKED_OUT" });
          //     notify("checkout");
          //   })
          //   .catch((err) => {
          //     notify("error", err.response.data.message);
          //   });
        }}>
        ارسال سفارش
      </button>
    </div>
  );
};

export default PreviewPay;
