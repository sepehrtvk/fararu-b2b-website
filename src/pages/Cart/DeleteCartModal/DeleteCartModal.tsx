import React, { useState } from "react";
import { t } from "i18next";
import { deleteBasket } from "../../../store/slices/basket";
import { useAppDispatch } from "../../../store/hooks";
import ModalComponent from "../../../components/Modal/ModalComponent";
import Icon from "../../../components/Icon/Icon";

const DeleteCartModal = () => {
  const modalData = {
    headerText: t("empty_basket"),
    bodyText: t("are_you_sure_delete_basket"),
    footerButtonText: t("cancel"),
    footerButtonText2: t("ok"),
  };
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const deleteBasketHandler = () => {
    dispatch(deleteBasket());
    closeModal();
  };

  return (
    <div>
      <span className='btn d-flex me-4' onClick={openModal}>
        <span>حذف سبد خرید</span>
        <span>
          <Icon className='me-1' name='trash3' color='danger' size={4} />
        </span>
      </span>

      <ModalComponent
        headerText={modalData.headerText}
        bodyText={modalData.bodyText}
        footerButtonText={modalData.footerButtonText}
        modalIsOpen={open}
        closeModal={closeModal}
        confirmModal={deleteBasketHandler}
        footerButtonText2={modalData.footerButtonText2}
      />
    </div>
  );
};

export default DeleteCartModal;
