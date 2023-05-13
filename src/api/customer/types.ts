export interface CustomerProfileModel {
  id: number;
  customerCode: number | null | undefined;
  firstName: string;
  lastName: string;
  storeName: string;
  stateName: string;
  address: string;
  phoneNo: string;
  mobileNo: string;
  credit: number;
  customerGroupId: number | null;
  customerGroupName: string | null;
  economicCode: string | null;
  nationalCode: string | null;
  cityId: string | null;
  customerSubGroup1Id: number | null;
  customerSubGroup2Id: string | null;
  cityName: string | null;
  customerSubGroup1Name: string | null;
  customerSubGroup2Name: string | null;
  paymentType: string | null;
  regionName: string | null;
  areaName: string | null;
  postCode: string | null;
  userId: number;
  latitude: number;
  longitude: number;
  isCashAllowed: boolean;
  isOnlineAllowed: boolean;
  isChequeAllowed: boolean;
  isCreditAllowed: boolean;
}

export enum CustomerStatus {
  active = 1,
  diactivated = 2,
}
export interface CustomerModel {
  id: number;
  custCode: string;
  oldCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  realName: string;
  custAllName: string;
  custType: number;
  custRegType: number;
  phone: string;
  faxNo: string;
  mobile: string;
  email: string;
  status: CustomerStatus;
  postCode: string;
  custCtgrRef: number;
  dcRef: number;
  comment: string;
  custGUID: string;
  address: string;
  latitude: number;
  longitude: number;
  custTypeName: string;
  custActName: string;
  custCtgrName: string;
  statusName: string;
}

export interface GeneralConfig {
  showableFields: string[];
  mandatoryFields: string[];
  polShowProductOnHandQty: boolean;
  polShowProductWithoutPrice: boolean;
  polShowPaymentType: boolean;
  polPaymentTypeShowOrder: 1 | 2;
  polShowOnlinePaymentType: boolean;
  polShowCustomerCreditRemain: boolean;
  polCashPaymentUsanceId: number;
  polOnlinePaymentUsanceId: number;
  polChequePaymentUsanceId: number;
  polCreditPaymentUsanceId: number;
}

export interface CustomerProfileCollection {
  customerCode?: number;
  firstName?: string;
  lastName?: string;
  storeName?: string;
  address?: string;
  economicCode?: string;
  nationalCode?: string;
  postCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface CustomerCreditModel {
  bedCreditRemain: number;
  asnCreditRemain: number;
  controlBedCredit: boolean;
  controlAsnCredit: boolean;
}
