import React, { useState } from "react";
import ModalComponent from "../../../components/Modal/ModalComponent";
import { t } from "i18next";

const TermsModal = () => {
  const modalData = {
    headerText: "قوانین و مقررات",
    bodyText: t("terms"),
    footerButtonText: t("ok"),
  };

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className='fw-light textJustify mt-1'
        style={{ fontSize: "0.75rem" }}>
        <span> ورود شما به معنای پذیرش</span>
        <span
          className='text-danger text-decoration-underline'
          style={{ cursor: "pointer" }}
          onClick={openModal}>
          {" "}
          شرایط و قوانین حریم‌خصوصی{" "}
        </span>
        <span>است.</span>
      </div>

      <ModalComponent
        headerText={modalData.headerText}
        bodyText={modalData.bodyText}
        footerButtonText={modalData.footerButtonText}
        modalIsOpen={open}
        closeModal={closeModal}
      />
    </div>
  );
};

export default TermsModal;
