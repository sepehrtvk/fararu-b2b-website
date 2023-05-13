import {Observable} from 'rxjs';
import {Api} from '..';
import {store} from '../../store/store';

import {CardexModel} from './types';

export const getCustomerCardexes = (): Observable<CardexModel[]> => {
  const customerId = store.getState().customer.CustomerId;

  return new Api().get<CardexModel[]>('/api/PolCustomers/GetCustomerCardex', {
    query: {customerId},
  });
};
