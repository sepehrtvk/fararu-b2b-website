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
import TableComponenet from "../../../components/TableComponenet";
import OptionHeader from "../../../components/OptionHeader/OptionHeader";

const headers: string[] = [
  "نام کالا",
  "قیمت مصرف کننده",
  "واحد فروش",
  "قابل پرداخت",
];

const OrderDetail = () => {
  const params = useParams();
  const OrderId = params.orderId ? params.orderId : "";
  const [loading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<OrderDetailModel[]>([]);
  const [detailsPage, setDetailsPage] = useState<any[][]>([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    getOrderDetailById(OrderId)
      .pipe(
        finalize(() => {
          setLoading(false);
        })
      )
      .subscribe({
        next: (data) => {
          setDetails(data);
          const mappedData = data.map((item) => ({
            name: item.name ? item.name : "---",
            consumerUnitPrice: item.consumerUnitPrice
              ? toLocaleCurrencyString(item.consumerUnitPrice)
              : "---",

            unitName: item.unitName ? item.unitName : "---",
            finalPrice: item.finalPrice
              ? toLocaleCurrencyString(item.finalPrice)
              : "---",
          }));
          const chunkSize = 10;
          const newData = [];
          for (let i = 0; i < mappedData.length; i += chunkSize) {
            const chunk = mappedData.slice(i, i + chunkSize);
            newData.push(chunk);
          }
          setDetailsPage(newData);
        },
        error: (err: AjaxError) => {
          notifyToast("error", { message: err.message });
        },
      });
  }, []);

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

  return (
    <div className='container-fluid bg-light3'>
      <div className='container py-5'>
        <div className='row'>
          <OptionHeader title={"جزئیات سفارش"} iconTitle={"list-task"} />
          {details && details.length && !loading ? (
            <div className='col-12'>
              <div className=' rounded-3 bg-white p-4'>
                <TableComponenet
                  headers={headers}
                  data={detailsPage[page - 1]}
                  page={page}
                  setPage={setPage}
                  totalElements={details?.length}
                />
              </div>
            </div>
          ) : null}
          {loading && <div>{renderSkeleton()}</div>}
          {details.length == 0 && !loading && (
            <div className='col-12 py-4 mt-2 text-center'>
              <span className='text-danger'>هیچ موردی یافت نشد!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
