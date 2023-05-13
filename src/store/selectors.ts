import {createSelector} from '@reduxjs/toolkit';
import {BasketItem} from '../api/basket/types';
import {RootState} from './store';

export const selectBasketItemsAsList = (state: RootState) =>
  Object.values(state.basket.items);
const selectBasketItems = (state: RootState) => state.basket.items;
export const selectBasketTotalQty = createSelector(selectBasketItems, items => {
  const values = Object.values(items);
  if (values.length > 0)
    return values
      .map(item => item.qty * item.unitInfo.convertFactor)
      .reduce((prev, current) => prev + current);
  else return 0;
});

export const selectBasketSKU = createSelector(selectBasketItems, items => {
  const values = Object.values(items);
  if (values.length > 0)
    return values
      .map(item => item.qty)
      .reduce((prev, current) => prev + current);
  else return 0;
});

const selectFromBasketByProductId = (
  state: RootState,
  productId: string,
): BasketItem[] => {
  const basketItems: BasketItem[] = [];
  Object.keys(state.basket.items).forEach(key => {
    if (key.startsWith(productId + '-'))
      basketItems.push(state.basket.items[key]);
  });
  return basketItems;
};

export const selectBasketItemTotalQty = createSelector(
  selectFromBasketByProductId,
  items => {
    if (items.length > 0)
      return items
        .map(item => item.qty * item.unitInfo.convertFactor)
        .reduce((prev, current) => prev + current);
    else return 0;
  },
);
