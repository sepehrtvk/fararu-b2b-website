import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AlertType = 'error' | 'warning' | 'success' | 'info';
export interface AlertItem {
  duration?: number;
  type: AlertType;
  message: string;
  id: number;
}
interface AlertState {
  alerts: AlertItem[];
}

const initialState: AlertState = {
  alerts: [],
};
const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{
        message: string;
        type: AlertType;
        duration?: number;
      }>,
    ) => {
      const alert = action.payload;
      let maxId = 0;
      state.alerts.forEach(al => {
        if (al.id > maxId) maxId = al.id;
      });
      state.alerts.push({
        id: maxId + 1,
        message: alert.message,
        type: alert.type,
        duration: alert.duration,
      });
    },
    clearAlerts: state => {
      state.alerts = [];
    },
    clearAlert: (state, action: PayloadAction<number>) => {
      const idx = state.alerts.findIndex(al => al.id == action.payload);
      state.alerts.splice(idx, 1);
    },
  },
});

export const {showAlert, clearAlerts, clearAlert} = alertSlice.actions;
export default alertSlice.reducer;
