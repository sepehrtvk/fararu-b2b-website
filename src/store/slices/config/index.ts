import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GeneralConfig} from '../../../api/customer/types';

const initialState: GeneralConfig = {
  showableFields: [],
  mandatoryFields: [],
  polShowProductOnHandQty: false,
  polShowProductWithoutPrice: false,
  polShowPaymentType: false,
  polPaymentTypeShowOrder: 1,
  polShowOnlinePaymentType: false,
  polShowCustomerCreditRemain: false,
  polCashPaymentUsanceId: -1,
  polOnlinePaymentUsanceId: -1,
  polChequePaymentUsanceId: -1,
  polCreditPaymentUsanceId: -1,
};
const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setGeneralConfig: (state, action: PayloadAction<GeneralConfig>) => {
      state.showableFields = action.payload.showableFields;
      state.mandatoryFields = action.payload.mandatoryFields;
      state.polShowProductOnHandQty = action.payload.polShowProductOnHandQty;
      state.polShowProductWithoutPrice =
        action.payload.polShowProductWithoutPrice;
      state.polShowPaymentType = action.payload.polShowPaymentType;
      state.polPaymentTypeShowOrder = action.payload.polPaymentTypeShowOrder;
      state.polShowOnlinePaymentType = action.payload.polShowOnlinePaymentType;
      state.polShowCustomerCreditRemain =
        action.payload.polShowCustomerCreditRemain;
      state.polCashPaymentUsanceId = action.payload.polCashPaymentUsanceId;
      state.polOnlinePaymentUsanceId = action.payload.polOnlinePaymentUsanceId;
      state.polChequePaymentUsanceId = action.payload.polChequePaymentUsanceId;
      state.polCreditPaymentUsanceId = action.payload.polCreditPaymentUsanceId;
    },
  },
});

export const {setGeneralConfig} = configSlice.actions;
export default configSlice.reducer;
