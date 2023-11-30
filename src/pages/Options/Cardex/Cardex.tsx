import React, { useEffect, useState } from "react";
import { CardexModel } from "../../../api/cardex/types";
import { getCustomerCardexes } from "../../../api/cardex";
import { finalize } from "rxjs";
import notifyToast from "../../../components/toast/toast";

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

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-4 col-12 py-4'>
          <div className='d-flex flex-column justify-content-between align-items-center rounded-3 shadow-sm bg-white h-100 py-5 border'>
            کاردکس مشتری
          </div>
        </div>
        <div className='col-md-8 col-12 py-4 mt-3 mt-md-0'>
          <div className='row rounded-3 shadow-sm bg-white pt-5 border'>sd</div>
        </div>
      </div>
    </div>
  );
};

export default Cardex;
