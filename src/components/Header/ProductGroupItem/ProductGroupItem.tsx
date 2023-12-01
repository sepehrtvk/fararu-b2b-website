import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ProductGroupTwoLevelModel } from "../../../api/product/types";
import Icon from "../../Icon/Icon";
import { useNavigate } from "react-router-dom";

type ProductGroupItemProps = {
  productGroupTwoLevel: ProductGroupTwoLevelModel;
};

const ProductGroupItem = ({ productGroupTwoLevel }: ProductGroupItemProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (productGroupTwoLevel.secondLevel?.length == 0) {
      navigate("/shop", {
        state: { menuItemId: productGroupTwoLevel.firstLevel?.id },
      });
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className='text-dark'
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={
          productGroupTwoLevel.secondLevel?.length ? (
            <Icon size={6} color='dark' name='chevron-down' />
          ) : null
        }>
        <span className='ms-2'> {productGroupTwoLevel.firstLevel?.title}</span>
      </Button>
      {productGroupTwoLevel.secondLevel?.length ? (
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          {productGroupTwoLevel.secondLevel?.map((sub) => {
            return (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/shop", { state: { menuItemId: sub.id } });
                }}>
                {sub.title}
              </MenuItem>
            );
          })}
        </Menu>
      ) : null}
    </div>
  );
};

export default ProductGroupItem;
