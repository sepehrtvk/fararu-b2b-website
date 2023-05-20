import React, { useEffect, useState } from "react";
//Styles
import styles from "./Preview.module.css";
import { store } from "../../../store/store";
import { getBasketFullData } from "../../../api/basket";
import { finalize } from "rxjs";
import {
  BasketFullDataItem,
  BasketFullDataModel,
} from "../../../api/basket/types";
import notifyToast from "../../toast/toast";
import { useNavigate } from "react-router-dom";
import PreviewPay from "../PreviewPay/PreviewPay";
import { toLocaleCurrencyString } from "../../../common/Localization";
import PreviewProduct from "../PreviewProduct/PreviewProduct";

const Preview = () => {
  const [previewItems, setPreviewItems] = useState<BasketFullDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { CustomerId, CustomerGroupId } = store.getState().customer;
  const navigate = useNavigate();

  useEffect(() => {
    if (CustomerId) {
      setIsLoading(true);
      getBasketFullData({
        CustomerGroupId,
        CustomerId,
        PaymentUsanceId: null,
        IsPrizePreview: true,
      })
        .pipe(finalize(() => setIsLoading(false)))
        .subscribe({
          next: (result: BasketFullDataModel) => {
            if (result.message)
              notifyToast("error", { message: result.message });
            if (result && result.items) setPreviewItems(result.items);
            else setPreviewItems([]);
          },
          error: (err: Error) => {
            notifyToast("error", { message: err.message });
            navigate("/cart");
          },
        });
    } else notifyToast("error", { message: "Customer id is null" });
  }, []);

  if (isLoading) return <p>loading..</p>;

  return (
    <div className='container-fluid bg-light2 py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <h4 className='card-title mb-3'>پیش نمایش</h4>
            <div className='card border-0 rounded-4'>
              <div className='card-body p-4'>
                <div className='d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom'>
                  <span>لیست محصولات منتخب شما</span>
                  <div>
                    <span>جمع کالاهای سفارش داده شده : </span>
                    <span className='fw-bold fs-5'>
                      {previewItems.length &&
                        toLocaleCurrencyString(
                          previewItems
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
                {previewItems.length &&
                  previewItems.map((product) => (
                    <PreviewProduct
                      key={product.product.productId}
                      previewItem={product}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <h4 className='card-title mb-3'>اطلاعات بیشتر</h4>
            <div className='card border-0 rounded-4'>
              <div className='card-body p-4'>
                {previewItems.length > 0 && (
                  <PreviewPay previewItems={previewItems} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
