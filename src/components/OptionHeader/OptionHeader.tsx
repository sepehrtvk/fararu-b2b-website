import React from "react";
import { OptionHeaderProps } from "./type";
import Icon from "../Icon/Icon";
import { useNavigate } from "react-router-dom";

const OptionHeader = ({
  title,
  iconTitle,
  hideBackButton,
}: OptionHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className='col-12 mb-4'>
      <div className='d-flex align-items-center bg-white py-4 rounded-3'>
        {!hideBackButton && (
          <div
            className='btn btn-light3 d-flex align-items-center ms-4 me-4'
            onClick={() => {
              navigate(-1);
            }}>
            <Icon name={"arrow-right"} color={"text"} size={5} />
            <span className='me-2'>بازگشت</span>
          </div>
        )}
        <div
          className={
            !hideBackButton
              ? "d-flex justify-content-center fw-bold fs-4 pe-4 border-end"
              : "d-flex justify-content-center fw-bold fs-4 pe-4 "
          }>
          <Icon name={iconTitle} color={"text"} size={2} />
          <span className='me-3'>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default OptionHeader;
