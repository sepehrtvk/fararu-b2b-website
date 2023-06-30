import React, { useEffect, useState } from "react";
import Icon from "../../../components/Icon/Icon";
import {
  ProductGroupModel,
  ProductGroupTwoLevelModel,
} from "../../../api/product/types";
import { getProductGroups } from "../../../api/product";

import noImage from "../../../assets/img/no-image.jpeg";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { finalize } from "rxjs";

const Categories = () => {
  const [productGroupTwoLevel, setProductGroupTwoLevel] = useState<
    ProductGroupTwoLevelModel[]
  >([]);

  const [activeCategory, setActiveCategory] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = getProductGroups()
      .pipe(finalize(() => setIsLoading(false)))
      .subscribe({
        next: (tree: ProductGroupModel[]) => {
          const productGroupTwoLevelTemp: ProductGroupTwoLevelModel[] = [];
          if (tree[0].submenus) {
            tree[0].submenus.map((row) => {
              row.submenus?.map((sub) => {
                const temp: ProductGroupTwoLevelModel = {
                  firstLevel: null,
                  secondLevel: [],
                };
                // if (sub.nLevel == 1) {
                temp.firstLevel = sub;
                if (sub.submenus) temp.secondLevel = sub.submenus;
                //}
                productGroupTwoLevelTemp.push(temp);
              });
            });
            setProductGroupTwoLevel(productGroupTwoLevelTemp);
            setActiveCategory(productGroupTwoLevelTemp[0].firstLevel?.id);
          }
        },
        error: () => {},
      });
    return () => subscription.unsubscribe();
  }, []);

  const renderFirstLevelTitle = () => {
    return productGroupTwoLevel.map((group) => {
      return (
        <div
          key={group.firstLevel?.id}
          className='mx-4'
          style={{ cursor: "pointer" }}>
          <span
            className={
              " pb-2 " +
              (activeCategory == group.firstLevel?.id
                ? "text-black border-bottom border-3 border-primary"
                : "text-info")
            }
            onClick={() => {
              setActiveCategory(group.firstLevel?.id);
            }}>
            {group.firstLevel?.title}
          </span>
        </div>
      );
    });
  };

  const renderFirstLevelItems = () => {
    const secondLevel = productGroupTwoLevel.filter(
      (item) => item.firstLevel?.id == activeCategory
    );
    const secondLevelTemp = secondLevel[0] ? secondLevel[0].secondLevel : null;

    if (secondLevelTemp && secondLevelTemp.length) {
      return secondLevelTemp?.map((item) => {
        return (
          <div
            key={item?.id}
            className='d-flex flex-column align-items-center  mx-4'>
            <img
              className='bg-light p-3 rounded-circle'
              width={"200px"}
              src={item.imageUrl ? item.imageUrl : noImage}
              alt={item.title}
            />
            <span className='mt-2'>{item.title}</span>
          </div>
        );
      });
    } else return null;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='my-5 py-5 d-md-block d-none'>
      <div className='d-flex justify-content-center align-items-center mb-5'>
        <div className='d-flex align-items-center'>
          <Icon name='grid' size={2} color='primary' />
          <h3 className='fw-bold me-2 mb-0'>دسته بندی محصولات</h3>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center mb-5'>
        {renderFirstLevelTitle()}
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        {renderFirstLevelItems()}
      </div>
    </div>
  );
};

export default Categories;
