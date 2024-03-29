import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

type ModalComponentProps = {
  headerText: string;
  bodyText: string;
  footerButtonText: string;
  footerButtonText2?: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  confirmModal?: () => void;
};

const ModalComponent = (props: ModalComponentProps) => {
  return (
    <div>
      <Dialog open={props.modalIsOpen} onClose={props.closeModal}>
        <DialogTitle className=' border-bottom'>{props.headerText}</DialogTitle>
        <DialogContent className='py-4'>
          <DialogContentText className='textJustify'>
            {props.bodyText}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='justify-content-center'>
          {props.footerButtonText2 && (
            <span
              className='btn btn-info text-white mb-3 ms-3'
              onClick={props.confirmModal}>
              {props.footerButtonText2}
            </span>
          )}
          <span
            className='btn btn-primary text-white mb-3'
            onClick={props.closeModal}>
            {props.footerButtonText}
          </span>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalComponent;
