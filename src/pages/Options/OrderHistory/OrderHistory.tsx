import React, { useEffect, useState } from "react";
import KDatePicker from "../../../components/KDatePicker";
import { DateObject } from "react-multi-date-picker";
import { RangePickerType } from "../../../components/KDatePicker/type";
import TextField from "@mui/material/TextField";
import Icon from "../../../components/Icon/Icon";
import { OrderHistoryModel } from "../../../api/orderHistory/types";
import { getOrderHistory } from "../../../api/orderHistory";
import { finalize, tap } from "rxjs";
import { AjaxError } from "rxjs/ajax";
import notifyToast from "../../../components/toast/toast";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import {
  convertNumbersToPersian,
  toLocaleCurrencyString,
  toLocaleNumberString,
} from "../../../common/Localization";
import Button from "../../../components/Button/Button";

const OrderHistory = () => {
  const [startDate, setStartDate] = useState<RangePickerType>(null);
  const [orders, setOrders] = useState<OrderHistoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getOrderHistory()
      .pipe(
        tap(() => {
          setLoading(true);
        }),
        finalize(() => {
          setLoading(false);
        })
      )
      .subscribe({
        next: setOrders,
        error: (err: AjaxError) => {
          if (err.response.message)
            notifyToast("error", { message: err.response.message });
          else notifyToast("error", { message: err.message });
        },
      });
  }, []);

  const renderSkeleton = () => {
    return (
      <Stack
        className='border rounded-3 shadow-sm px-4 py-2'
        alignItems={"center"}>
        <Skeleton
          className='mb-2'
          variant='text'
          width={210}
          sx={{ fontSize: "1rem" }}
        />
        <Skeleton
          className='mb-2'
          variant='text'
          width={210}
          sx={{ fontSize: "1rem" }}
        />
        <Skeleton
          className='mb-2'
          variant='text'
          width={210}
          sx={{ fontSize: "1rem" }}
        />
        <Skeleton variant='rounded' width={210} height={60} />
      </Stack>
    );
  };
  const renderLabeledText = (label: string, value: string) => {
    return (
      <div className='d-flex align-items-start my-2'>
        <span className='fw-bold'>{label} </span>
        <span>:</span>
        <span className='text-primary me-1 textJustify'>
          {value ? value : "---"}
        </span>
      </div>
    );
  };

  const renderOrderItem = (item: OrderHistoryModel, index: number) => {
    let orderTime = item.createdDateTime.split("T")[1].split(".")[0];
    orderTime = orderTime
      .split(":")
      .map((date) => {
        let persianNum = toLocaleNumberString(date);
        if (persianNum.length == 2) return persianNum;
        else return toLocaleNumberString(0) + persianNum;
      })
      .join(":");

    let orderDate = item.orderDate
      .split("/")
      .map((date) => toLocaleNumberString(date))
      .join("/");

    return (
      <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
        <div className='border rounded-3 shadow-sm px-4 py-2 h-100'>
          <div className='d-flex justify-content-center'>
            <h5 className='border rounded-3 px-2 py-1 bg-light2'>
              {index + 1}
            </h5>
          </div>
          {renderLabeledText(
            "شماره پیگیری",
            convertNumbersToPersian(item.trackingCode)
          )}
          {renderLabeledText("تاریخ", orderDate)}
          {renderLabeledText("زمان", orderTime)}
          {renderLabeledText("وضعیت", item.orderStateTitle)}
          {renderLabeledText("روش پرداخت", item.paymentUsanceTitle)}
          {renderLabeledText(
            "تعداد اقلام",
            toLocaleNumberString(item.totalQty)
          )}
          {renderLabeledText(
            "تعداد کالا",
            toLocaleNumberString(item.itemsCount)
          )}
          {renderLabeledText(
            "قابل پرداخت",
            toLocaleCurrencyString(item.payableAmount)
          )}
          {renderLabeledText(
            "قیمت کل",
            toLocaleCurrencyString(item.totalPrice)
          )}
          {renderLabeledText(
            "تخفیف",
            toLocaleCurrencyString(item.discountAmount)
          )}
          {renderLabeledText("اضافه", toLocaleCurrencyString(item.addAmount))}
          {renderLabeledText("توضیحات", item.description)}

          <Button
            label={"مشاهده جزیات"}
            className={"btn-primary text-white w-100"}
            onClickHandler={() => {
              console.log(item.orderId);
            }}
          />
        </div>
      </Grid>
    );
  };

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-12 py-4'>
          <div className='d-flex justify-content-center rounded-3 shadow-sm bg-white py-5 border fs-4'>
            <Icon name={"cart"} color={"text"} size={2} />
            <span className='me-3'>سابقه خرید</span>
          </div>
        </div>
        {orders.length > 0 && !loading && (
          <div className='col-12 py-4 mt-2'>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 12 }}>
              {orders.map((item, index) => renderOrderItem(item, index))}
            </Grid>
          </div>
        )}
        {loading && (
          <div className='col-12 py-4 mt-2'>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 12 }}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <div>{renderSkeleton()}</div>
              </Grid>
              <Grid item xs={1} md={3}>
                <div>{renderSkeleton()}</div>
              </Grid>
              <Grid item xs={1} md={3}>
                <div>{renderSkeleton()}</div>
              </Grid>
              <Grid item xs={1} md={3}>
                <div>{renderSkeleton()}</div>
              </Grid>
            </Grid>
          </div>
        )}
        {orders.length == 0 && !loading && (
          <div className='col-12 py-4 mt-2 text-center'>
            <span className='text-danger'>هیچ موردی یافت نشد!</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <p>4444</p>
      <KDatePicker
        type='rangePicker'
        value={startDate}
        onChange={setStartDate}
        maxDate={new DateObject()}
        renderComponent={
          <TextField
            fullWidth
            id='textInput'
            type={"text"}
            label={"تاریخ"}
            variant='outlined'
          />
        }
      />
    </div>
  );
};

export default OrderHistory;
