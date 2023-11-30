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
import { useNavigate } from "react-router-dom";
import "./categories.css";
import { getLastTwoLevels } from "../../../common/arrays";
import Grid from "@mui/material/Grid";

const Categories = () => {
  const [productGroupTwoLevel, setProductGroupTwoLevel] = useState<
    ProductGroupTwoLevelModel[]
  >([]);

  const [activeCategory, setActiveCategory] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = getProductGroups()
      .pipe(finalize(() => setIsLoading(false)))
      .subscribe({
        next: (tree: ProductGroupModel[]) => {
          const productGroupTwoLevelTemp: ProductGroupTwoLevelModel[] = [];
          const tempTree = getLastTwoLevels(tree);

          tempTree.map((temptree: ProductGroupModel) => {
            const temp: ProductGroupTwoLevelModel = {
              firstLevel: null,
              secondLevel: [],
            };
            temp.firstLevel = temptree;
            if (temptree.submenus) temp.secondLevel = temptree.submenus;
            productGroupTwoLevelTemp.push(temp);
          });

          setProductGroupTwoLevel(productGroupTwoLevelTemp);
          setActiveCategory(productGroupTwoLevelTemp[0].firstLevel?.id);
        },
        error: () => {},
      });
    return () => subscription.unsubscribe();
  }, []);

  const renderFirstLevelTitle = () => {
    return productGroupTwoLevel.map((group) => {
      return (
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          lg={2}
          key={group.firstLevel?.id}
          className='text-center'
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
        </Grid>
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
            onClick={() => {
              navigate("/shop", { state: { menuItemId: item.id } });
            }}
            className='d-flex flex-column align-items-center mx-4 hoverGroup'>
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
      <Grid
        justifyContent={"center"}
        className='mb-5'
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 12, sm: 12, md: 12 }}>
        {renderFirstLevelTitle()}
      </Grid>
      <div className='d-flex justify-content-center align-items-center'>
        {renderFirstLevelItems()}
      </div>
    </div>
  );
};

export default Categories;
