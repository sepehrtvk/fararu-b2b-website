import { useEffect, useState } from "react";
import Icon from "../../../components/Icon/Icon";

export type ShopSortTypes = "topSell" | "topNew" | null;
type ShopSortProps = {
  sortShopHandler: (sortType: ShopSortTypes) => void;
};
const ShopSort = ({ sortShopHandler }: ShopSortProps) => {
  const [activeSortType, setactiveSortType] = useState<ShopSortTypes>(null);

  const activeClass = "btn bg-light2 rounded-3 text-danger mx-1 py-2 px-3";
  const notActiveClass = "btn text-dark mx-1 py-2 px-3";

  useEffect(() => {
    if (activeSortType) sortShopHandler(activeSortType);
  }, [activeSortType]);

  return (
    <div className='card rounded-3 my-4'>
      <div className='card-body p-2'>
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center ms-md-5 ms-0'>
            <span>
              <Icon name='filter' size={4} color='black' />
            </span>
            <span className='me-2'>ترتیب نمایش:</span>
          </div>
          <div className='d-flex align-items-center'>
            <span
              className={
                activeSortType == "topSell" ? activeClass : notActiveClass
              }
              onClick={() => setactiveSortType("topSell")}>
              پرفروش ترین
            </span>
            <span
              className={
                activeSortType == "topNew" ? activeClass : notActiveClass
              }
              onClick={() => setactiveSortType("topNew")}>
              جدیدترین
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSort;
