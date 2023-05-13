import {Observable} from 'rxjs';
import {Api} from '..';

import {PolPaymentModel} from './types';

export const getPolPayments = (
  customerid: number,
): Observable<PolPaymentModel[]> =>
  new Api().get<PolPaymentModel[]>('api/PolPayment/get', {
    query: {customerid},
  });
