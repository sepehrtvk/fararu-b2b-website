import React, { useState } from "react";
import { BasketFullDataItem } from "../../../api/basket/types";
import {
  toLocaleCurrencyString,
  toLocaleNumberString,
} from "../../../common/Localization";
import { store } from "../../../store/store";
import { checkout } from "../../../api/basket";
import { finalize } from "rxjs";
import { deleteBasket } from "../../../store/slices/basket";
import notifyToast from "../../toast/toast";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type PreviewPayProps = {
  previewItems: BasketFullDataItem[];
};
const PreviewPay = ({ previewItems }: PreviewPayProps) => {
  const { CustomerId, CustomerGroupId } = store.getState().customer;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const checkOut = () => {
    if (CustomerId) {
      setIsLoading(true);
      checkout({
        CustomerGroupId,
        CustomerId,
        PaymentUsanceId: null,
      })
        .pipe(finalize(() => setIsLoading(false)))
        .subscribe({
          next: (result) => {
            if (result.success) {
              store.dispatch(deleteBasket());
              notifyToast("success", {
                message: t("order_sent_successfully"),
                data: t("tracking_code") + " : " + result.trackingCode,
              });
              navigate("/home");
            } else {
              notifyToast("error", {
                message: result.errorMessage ? result.errorMessage : "",
              });
            }
          },
          error: (err: Error) => {
            notifyToast("error", {
              message: err.message,
            });
          },
        });
    } else
      notifyToast("error", {
        message: "Customer id is null",
      });
  };

  if (isLoading) return <LoadingSpinner />;

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
        onClick={checkOut}>
        ارسال سفارش
      </button>
    </div>
  );
};

export default PreviewPay;
