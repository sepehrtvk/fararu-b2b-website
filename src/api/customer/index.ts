import {exhaustMap, map, Observable} from 'rxjs';
import {Api} from '..';
import {store} from '../../store/store';

import {
  CustomerCreditModel,
  CustomerModel,
  CustomerProfileCollection,
  CustomerProfileModel,
  GeneralConfig,
} from './types';

export const getCustomers = (
  skip: number,
  take: number,
  searchKey: string,
): Observable<CustomerModel[]> => {
  const centerId = store.getState().user.centerId;
  return new Api()
    .get<{value: CustomerModel[]}>('CustomerOData', {
      params: {
        $skip: skip,
        $top: take,
        $filter: `((dcRef eq ${centerId}) AND (contains(custAllName, '${searchKey}') OR (custCode eq '${searchKey}')))`,
      },
      log: true,
    })
    .pipe(map(item => item.value));
};

export const getCustomerProfile =
  (): Observable<CustomerProfileModel | null> => {
    const customerId = store.getState().customer.CustomerId;
    return new Api()
      .get<CustomerProfileModel[]>('/api/PolCustomers/CustomerProfile', {
        query: {customerId},
      })
      .pipe(
        map(response => {
          if (response.length > 0) return response[0];
          else return null;
        }),
      );
  };

export const postCustomerProfile = (
  userId: number,
  profile: CustomerProfileCollection,
): Observable<any> => {
  const body = {
    collection: profile,
    saveReason: 1,
  };
  return new Api()
    .post('api/poluserextrainfo/post', {
      body,
    })
    .pipe(
      exhaustMap(() => linkCustomer({collection: {userId}, saveReason: 1})),
    );
};

const linkCustomer = (body: {
  collection: {userId: number};
  saveReason: number;
}): Observable<any> => {
  return new Api().post('api/polcustomers/post', {
    body,
  });
};

export const getPolGeneralConfig = (): Observable<GeneralConfig> =>
  new Api().get<any>('api/general/GetPolGeneralConfig').pipe(
    map(response => ({
      polShowProductWithoutPrice: response.polShowProductWithoutPrice == 1,
      polShowProductOnHandQty: response.polShowProductOnHandQty == 1,
      showableFields: response.polUserCustomerShowableFields
        ?.split(',')
        .map((item: string) => item.trim().toLowerCase()),
      mandatoryFields: response.polUserMandatoryFields
        ?.split(',')
        .map((item: string) => item.trim().toLowerCase()),
      polShowPaymentType: response.polShowPaymentType == 1,
      polPaymentTypeShowOrder: response.polPaymentTypeShowOrder,
      polShowOnlinePaymentType: response.polShowOnlinePaymentType == 1,
      polShowCustomerCreditRemain: response.polShowCustomerCreditRemain == 1,
      polCashPaymentUsanceId: response.polCashPaymentUsanceId,
      polOnlinePaymentUsanceId: response.polOnlinePaymentUsanceId,
      polChequePaymentUsanceId: response.polChequePaymentUsanceId,
      polCreditPaymentUsanceId: response.polCreditPaymentUsanceId,
    })),
  );

export const getCustomerCredit = (
  customerId: number,
  paymentUsanceId: number,
): Observable<CustomerCreditModel> =>
  new Api().get<CustomerCreditModel>('api/PolCustomers/CustomerCredit', {
    query: {customerId, paymentUsanceId},
  });
