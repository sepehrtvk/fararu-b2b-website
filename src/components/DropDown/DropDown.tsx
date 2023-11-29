import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "../Icon/Icon";

export interface DropDownProps {
  title: string;
  options: { text: string; onClick: () => void }[];
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
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {options.map((opt) => (
          <MenuItem key={opt.text} onClick={() => opt.onClick()}>
            {opt.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDown;
