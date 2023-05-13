import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SetCustomerPayload} from './payloads';

interface CustomerState {
  CustomerId: number | null | undefined;
  CustomerGroupId: number | null | undefined;
  CustomerCode?: string | null | undefined;
  CustomerName?: string | null | undefined;
  DcRef: number | null;
}

const initialState: CustomerState = {
  CustomerId: undefined,
  CustomerGroupId: undefined,
  CustomerCode: undefined,
  CustomerName: undefined,
  DcRef: null
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<SetCustomerPayload>) => {
      state.CustomerGroupId = action.payload.CustomerGroupId;
      state.CustomerId = action.payload.CustomerId;
      state.CustomerCode = action.payload.CustomerCode;
      state.CustomerName = action.payload.CustomerName;
      state.DcRef = action.payload.DcRef
    },
    clearCustomer: state => {
      state.CustomerGroupId = undefined;
      state.CustomerId = undefined;
      state.CustomerCode = undefined;
      state.CustomerName = undefined;
      state.DcRef = null
    },
  },
});

export const {setCustomer, clearCustomer} = customerSlice.actions;

export default customerSlice.reducer;
