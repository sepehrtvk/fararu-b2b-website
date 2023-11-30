import React, { useEffect, useState } from "react";
import { CardexModel } from "../../../api/cardex/types";
import { getCustomerCardexes } from "../../../api/cardex";
import { finalize } from "rxjs";
import notifyToast from "../../../components/toast/toast";
import {
  convertNumbersToPersian,
  toLocaleCurrencyString,
} from "../../../common/Localization";
import Grid from "@mui/material/Grid";
import Icon from "../../../components/Icon/Icon";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const Cardex = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cardexes, setCardexes] = useState<CardexModel[]>([]);

  useEffect(() => {
    getCustomerCardexes()
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: setCardexes,
        error: (err: Error) => {
          notifyToast("error", { message: err.message });
        },
      });
  }, []);

  const renderLabeledText = (label: string, value: string) => {
    return (
      <div className='d-flex align-items-center my-2'>
        <span className='fw-bold'>{label} </span>
        <span>:</span>
        <span className='text-primary me-1'>{value ? value : "---"}</span>
      </div>
    );
  };

  const renderCardexItem = (item: CardexModel, index: number) => {
    return (
      <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
        <div className='border rounded-3 shadow-sm px-4 py-2 h-100'>
          <div className='d-flex justify-content-center'>
            <h5 className='border rounded-3 px-2 py-1 bg-light2'>
              {index + 1}
            </h5>
          </div>

          {renderLabeledText(
            "تاریخ سند",
            convertNumbersToPersian(item.vchDate)
          )}
          {renderLabeledText("شماره سند", convertNumbersToPersian(item.vchNo))}
          {renderLabeledText("نوع سند", item.objectTypeName)}
          {renderLabeledText(
            "مبلغ بدهکاری",
            toLocaleCurrencyString(item.bedAmount)
          )}
          {renderLabeledText(
            "مبلغ بستانکاری",
            toLocaleCurrencyString(item.besAmount)
          )}

          {renderLabeledText("باقیمانده", toLocaleCurrencyString(item.balance))}
          {renderLabeledText("نام ویزیتور", item.dealerName)}
          {renderLabeledText("توضیحات", item.vocherDesc)}
        </div>
      </Grid>
    );
  };

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

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-12 py-4'>
          <div className='d-flex justify-content-center rounded-3 shadow-sm bg-white py-5 border fs-4'>
            <Icon name={"table"} color={"text"} size={2} />
            <span className='me-3'>کاردکس مشتری</span>
          </div>
        </div>
        {cardexes.length > 0 && !loading && (
          <div className='col-12 py-4 mt-2'>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 12 }}>
              {cardexes.map((item, index) => renderCardexItem(item, index))}
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
        {cardexes.length == 0 && !loading && (
          <div className='col-12 py-4 mt-2 text-center'>
            <span className='text-danger'>هیچ موردی یافت نشد!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardex;
