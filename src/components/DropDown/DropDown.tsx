import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "../Icon/Icon";
import Divider from "@mui/material/Divider";

export interface DropDownProps {
  title: string;
  options: {
    text: string;
    route: string;
    onClick: () => void;
    iconName: string;
  }[];
}

const DropDown = ({ title, options }: DropDownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        className='btn btn-light2 d-flex align-items-center'
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <span className='ms-2'>{title}</span>

        <Icon
          size={6}
          color='dark'
          name={open ? "chevron-up" : "chevron-down"}
        />
      </button>
      <Menu
        className='rounded-3'
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {options.map((opt) => (
          <>
            <MenuItem
              className='my-2'
              selected={window.location.href.includes(opt.route)}
              key={opt.text}
              onClick={() => {
                opt.onClick();
                handleClose();
              }}>
              <Icon name={opt.iconName} color={"text"} size={5} />
              <span className='me-2'>{opt.text}</span>
            </MenuItem>
            {opt.route == "orderHistory" && <Divider className='bg-dark' />}
          </>
        ))}
      </Menu>
    </div>
  );
};

export default DropDown;
