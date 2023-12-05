import React, { useEffect, useState } from "react";
import { getCustomerCardexes } from "../../../api/cardex";
import { finalize } from "rxjs";
import notifyToast from "../../../components/toast/toast";
import {
  convertNumbersToPersian,
  toLocaleCurrencyString,
} from "../../../common/Localization";
import Icon from "../../../components/Icon/Icon";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import TableComponenet from "../../../components/TableComponenet";
import OptionHeader from "../../../components/OptionHeader/OptionHeader";

const headers: string[] = [
  "تاریخ سند",
  "شماره سند",
  "نوع سند",
  "مبلغ بدهکاری",
  "مبلغ بستانکاری",
  "باقیمانده",
  "نام ویزیتور",
  "توضیحات",
];

const Cardex = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cardexes, setCardexes] = useState<any[]>([]);
  const [cardexesPage, setCardexesPage] = useState<any[][]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCustomerCardexes()
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: (data) => {
          setCardexes(data);
          const mappedData = data.map((item) => ({
            vchDate: item.vchDate
              ? convertNumbersToPersian(item.vchDate)
              : "---",
            vchNo: item.vchNo ? convertNumbersToPersian(item.vchNo) : "---",
            objectTypeName: item.objectTypeName ? item.objectTypeName : "---",
            bedAmount: item.bedAmount
              ? toLocaleCurrencyString(item.bedAmount, true)
              : "---",
            besAmount: item.besAmount
              ? toLocaleCurrencyString(item.besAmount, true)
              : "---",
            balance: item.balance
              ? toLocaleCurrencyString(item.balance, true)
              : "---",
            dealerName: item.dealerName ? item.dealerName : "---",
            vocherDesc: item.vocherDesc ? item.vocherDesc : "---",
          }));
          const chunkSize = 10;
          const newData = [];
          for (let i = 0; i < mappedData.length; i += chunkSize) {
            const chunk = mappedData.slice(i, i + chunkSize);
            newData.push(chunk);
          }
          setCardexesPage(newData);
        },
        error: (err: Error) => {
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
          <OptionHeader
            title={"کاردکس مشتری"}
            iconTitle={"table"}
            hideBackButton
          />
          {cardexes && cardexes.length && !loading ? (
            <div className='col-12'>
              <div className=' rounded-3 bg-white p-4'>
                <TableComponenet
                  headers={headers}
                  data={cardexesPage[page - 1]}
                  page={page}
                  setPage={setPage}
                  totalElements={cardexes?.length}
                />
              </div>
            </div>
          ) : null}
          {loading && <div>{renderSkeleton()}</div>}
          {cardexes.length == 0 && !loading && (
            <div className='col-12 py-4 mt-2 text-center'>
              <span className='text-danger'>هیچ موردی یافت نشد!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cardex;
