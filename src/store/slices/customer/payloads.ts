export interface SetCustomerPayload {
  CustomerId: number | null;
  CustomerGroupId: number | null;
  CustomerCode?: string;
  CustomerName?: string;
  DcRef: number | null
}
