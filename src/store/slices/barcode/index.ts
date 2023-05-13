import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BarcodeReceivedPayload} from './payloads';

interface BarcodeState {
  barcode: string | null;
  error: string | null;
  isProcessed: boolean;
}

const initialState: BarcodeState = {
  barcode: null,
  error: null,
  isProcessed: false,
};
const barcodeSlice = createSlice({
  name: 'barcode',
  initialState,
  reducers: {
    updateBarcode: (state, action: PayloadAction<BarcodeReceivedPayload>) => {
      const {barcode} = action.payload;
      state.barcode = barcode;
      state.error = null;
      state.isProcessed = false;
    },
    setProcessed: state => {
      state.isProcessed = true;
    },
  },
});

export const {updateBarcode, setProcessed} = barcodeSlice.actions;
export default barcodeSlice.reducer;
