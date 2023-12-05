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
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import {
  convertNumbersToPersian,
  toLocaleCurrencyString,
  toLocaleDateString,
  toLocaleNumberString,
} from "../../../common/Localization";
import TableComponenet from "../../../components/TableComponenet";
import OptionHeader from "../../../components/OptionHeader/OptionHeader";

const headers: string[] = [
  "شماره پیگیری",
  "تاریخ",
  "زمان",
  "وضعیت",
  "روش پرداخت",
  "تعداد اقلام",
  "تعداد کالا",
  "قابل پرداخت",
  "قیمت کل",
  "تخفیف",
  "اضافه",
  "توضیحات",
];

const excludeFields: string[] = ["orderId"];

const OrderHistory = () => {
  const [startDate, setStartDate] = useState<RangePickerType>(null);
  const [orders, setOrders] = useState<OrderHistoryModel[]>([]);
  const [ordersPage, setOrdersPage] = useState<any[][]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    getOrderHistory()
      .pipe(
        finalize(() => {
          setLoading(false);
        })
      )
      .subscribe({
        next: (data) => {
          setOrders(data);
          const newData = mapDataAndChunk(data);
          setOrdersPage(newData);
        },
        error: (err: AjaxError) => {
          if (err.response.message)
            notifyToast("error", { message: err.response.message });
          else notifyToast("error", { message: err.message });
        },
      });
  };

  const mapDataAndChunk = (data: OrderHistoryModel[]) => {
    const mappedData = data.map((item) => {
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

      return {
        trackingCode: item.trackingCode
          ? convertNumbersToPersian(item.trackingCode)
          : "---",
        orderId: item.orderId,
        orderDate: orderDate ? orderDate : "---",
        orderTime: orderTime ? orderTime : "---",
        orderStateTitle: item.orderStateTitle ? item.orderStateTitle : "---",
        paymentUsanceTitle: item.paymentUsanceTitle
          ? item.paymentUsanceTitle
          : "---",

        totalQty: toLocaleNumberString(item.totalQty)
          ? toLocaleNumberString(item.totalQty)
          : "---",
        itemsCount: toLocaleNumberString(item.itemsCount)
          ? toLocaleNumberString(item.itemsCount)
          : "---",
        payableAmount: toLocaleCurrencyString(item.payableAmount)
          ? toLocaleCurrencyString(item.payableAmount)
          : "---",
        totalPrice: toLocaleCurrencyString(item.totalPrice)
          ? toLocaleCurrencyString(item.totalPrice)
          : "---",

        discountAmount: toLocaleCurrencyString(item.discountAmount)
          ? toLocaleCurrencyString(item.discountAmount)
          : "---",

        addAmount: toLocaleCurrencyString(item.addAmount)
          ? toLocaleCurrencyString(item.addAmount)
          : "---",

        description: item.description ? item.description : "---",
      };
    });
    const chunkSize = 10;
    const newData = [];
    for (let i = 0; i < mappedData.length; i += chunkSize) {
      const chunk = mappedData.slice(i, i + chunkSize);
      newData.push(chunk);
    }
    return newData;
  };

  const renderSkeleton = () => {
    return (
      <div className='col-12 bg-white rounded-3 p-4'>
        <Stack alignItems={"center"}>
          <Skeleton variant='text' width={"100%"} sx={{ fontSize: "5rem" }} />
          <Skeleton variant='text' width={"100%"} sx={{ fontSize: "3rem" }} />
          <Skeleton variant='text' width={"100%"} sx={{ fontSize: "3rem" }} />
          <Skeleton variant='text' width={"100%"} sx={{ fontSize: "3rem" }} />
          <Skeleton variant='text' width={"100%"} sx={{ fontSize: "3rem" }} />
        </Stack>
      </div>
    );
  };

  const runFilter = () => {
    if (!startDate) return;
    const firstDate = startDate[0];
    const secondDate = startDate[1];
    if (!firstDate || !secondDate) return;
    setIsFiltered(true);

    const tempOrders: OrderHistoryModel[] = [];

    orders.map((order) => {
      const orderDate = new Date(order.orderDate);
      const start = new Date(toLocaleDateString(new Date(firstDate)));
      const end = new Date(toLocaleDateString(new Date(secondDate)));

      if (orderDate >= start && orderDate <= end) {
        tempOrders.push(order);
      }
    });

    setOrders(tempOrders);
    const newData = mapDataAndChunk(tempOrders);
    setOrdersPage(newData);
  };

  const removeFilter = () => {
    fetchOrders();
    setStartDate(null);
    setIsFiltered(false);
  };

  return (
    <div className='container-fluid bg-light3'>
      <div className='container py-5'>
        <div className='row'>
          <OptionHeader
            title={"سابقه خرید"}
            iconTitle={"cart"}
            hideBackButton
          />

          <div className='col-12'>
            <div className=' rounded-3 bg-white p-4 mb-4'>
              <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <span className='ms-3'>فیلتر نتایج:‌ </span>
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
                <div className='d-flex'>
                  {isFiltered && (
                    <>
                      <div
                        className='btn btn-light3  d-flex align-items-center ms-4 me-4'
                        onClick={removeFilter}>
                        <Icon name={"x-circle"} color={"text"} size={5} />
                        <span className='me-2'>حذف فیلتر</span>
                      </div>
                      <span className='border-end'></span>
                    </>
                  )}

                  <button
                    disabled={isFiltered || !startDate}
                    type='button'
                    className='btn btn-primary text-white d-flex align-items-center ms-4 me-4'
                    onClick={runFilter}>
                    <Icon name={"filter"} color={"text"} size={5} />
                    <span className='me-2'>اعمال فیلتر</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {orders && orders.length && !loading && (
            <div className='col-12'>
              <div className=' rounded-3 bg-white p-4'>
                <TableComponenet
                  linkUrl={"orderDetail/"}
                  headers={headers}
                  data={ordersPage[page - 1]}
                  page={page}
                  setPage={setPage}
                  totalElements={orders?.length}
                  excludeFields={excludeFields}
                />
              </div>
            </div>
          )}

          {loading && <div>{renderSkeleton()}</div>}
          {orders.length == 0 && !loading && (
            <div className='col-12 py-4 mt-2 text-center'>
              <span className='text-danger'>هیچ موردی یافت نشد!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
