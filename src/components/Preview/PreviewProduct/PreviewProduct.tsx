import React, { useState } from "react";
import styles from "./PreviewProduct.module.css";
import { BasketFullDataItem } from "../../../api/basket/types";
import noImage from "../../../assets/img/no-image.jpeg";
import {
  toLocaleCurrencyString,
  toLocaleNumberString,
} from "../../../common/Localization";
import Icon from "../../Icon/Icon";

type PreviewProductProps = {
  previewItem: BasketFullDataItem;
};
const PreviewProduct = ({ previewItem }: PreviewProductProps) => {
  const [showMore, setShowMore] = useState<boolean>(true);

  const extraDetails = () => {
    if (showMore) return null;
    return (
      <div className='rounded-4 bg-light2 px-4 py-3 mt-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <span>قیمت واحد : </span>
            <span className='fw-bold'>
              {toLocaleCurrencyString(previewItem.price, true)}
            </span>
          </div>
          <div className='mb-2'>
            <span>تخفیف : </span>
            <span className='fw-bold'>
              {toLocaleCurrencyString(previewItem.totalDiscountAmount, true)}
            </span>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <span>مبلغ ناخالص : </span>
            <span className='fw-bold'>
              {toLocaleCurrencyString(previewItem.totalAmount, true)}
            </span>
          </div>
          <div className='mb-2'>
            <span>اضافه : </span>
            <span className='fw-bold'>
              {toLocaleCurrencyString(previewItem.totalAddAmount, true)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderShowMoreButton = () => {
    if (showMore) {
      return (
        <span
          className='btn text-primary  d-flex align-items-center justify-content-center mt-1'
          onClick={() => setShowMore(!showMore)}>
          <span className='ms-2'>جزيات بیشتر </span>

          <span>
            <Icon name='caret-down' size={4} color='primary' />
          </span>
        </span>
      );
    } else
      return (
        <span
          className='btn text-primary d-flex align-items-center justify-content-center mt-1'
          onClick={() => setShowMore(!showMore)}>
          <span className='ms-2'>نمایش کمتر </span>

          <span>
            <Icon name='caret-up' size={4} color='primary' />
          </span>
        </span>
      );
  };

  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <div className={styles.image}>
          {previewItem.product.image && (
            <img
              src={previewItem.product.image}
              alt={previewItem.product.name}
            />
          )}
          {!previewItem.product.image && (
            <img src={noImage} alt='productImage' />
          )}
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='mb-3'>
                <span>{previewItem.product.name}</span>
              </div>
            </div>
            <div className='col-12'>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <div className='mb-1'>
                    <span>کد کالا : </span>
                    <span className='fw-bold'>
                      {toLocaleNumberString(previewItem.product.code)}
                    </span>
                  </div>
                  <div>
                    <span>تعداد : </span>
                    <span className='fw-bold ms-1'>
                      {toLocaleNumberString(previewItem.qty)}
                    </span>
                    <span className='ms-2 text-info'>
                      {previewItem.unitInfo.title}
                    </span>
                    {previewItem.unitLabel && (
                      <span className='text-info'>
                        ({previewItem.unitLabel})
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span>قابل پرداخت :‌ </span>
                  <span className='fw-bold text-primary'>
                    {toLocaleCurrencyString(previewItem.totalNetAmount, true)}
                  </span>
                </div>
              </div>
            </div>
            <div className='col-12'>{extraDetails()}</div>
            <div className='col-12 '>{renderShowMoreButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewProduct;
