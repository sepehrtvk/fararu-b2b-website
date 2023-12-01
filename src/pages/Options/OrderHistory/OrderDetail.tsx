import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetailById } from "../../../api/orderHistory";
import { finalize, tap } from "rxjs";
import { OrderDetailModel } from "../../../api/orderHistory/types";
import { AjaxError } from "rxjs/ajax";
import notifyToast from "../../../components/toast/toast";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Icon from "../../../components/Icon/Icon";
import { toLocaleCurrencyString } from "../../../common/Localization";

const OrderDetail = () => {
  const params = useParams();
  const OrderId = params.orderId ? params.orderId : "";
  const [loading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<OrderDetailModel[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getOrderDetailById(OrderId)
      .pipe(
        finalize(() => {
          setLoading(false);
        })
      )
      .subscribe({
        next: setDetails,
        error: (err: AjaxError) => {
          notifyToast("error", { message: err.message });
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

  const renderOrderItem = (item: OrderDetailModel, index: number) => {
    return (
      <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
        <div className='border rounded-3 shadow-sm px-4 py-2 h-100'>
          <div className='d-flex justify-content-center'>
            <h5 className='border rounded-3 px-3 py-2 bg-light2 mt-2 text-center'>
              {item.name}
            </h5>
          </div>
          {renderLabeledText(
            "قیمت مصرف کننده",
            toLocaleCurrencyString(item.consumerUnitPrice)
          )}
          {renderLabeledText("واحد فروش", item.unitName)}
          {renderLabeledText(
            "قابل پرداخت",
            toLocaleCurrencyString(item.finalPrice)
          )}
        </div>
      </Grid>
    );
  };

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-12 py-4'>
          <div className='d-flex justify-content-center rounded-3 shadow-sm bg-white py-5 border fs-4'>
            <Icon name={"list-task"} color={"text"} size={2} />
            <span className='me-3'>جزيبات سفارش</span>
          </div>
        </div>
        {details.length > 0 && !loading && (
          <div className='col-12 py-4 mt-2'>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 12 }}>
              {details.map((item, index) => renderOrderItem(item, index))}
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
        {details.length == 0 && !loading && (
          <div className='col-12 py-4 mt-2 text-center'>
            <span className='text-danger'>هیچ موردی یافت نشد!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
