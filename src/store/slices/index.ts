import { combineReducers } from "redux";
import configReducer from "./config";
import userReducer from "./user";
import basketReducer from "./basket";
import barcodeReducer from "./barcode";
import customerReducer from "./customer";
import alertReducer from "./alert";

export default combineReducers({
  config: configReducer,
  user: userReducer,
  basket: basketReducer,
  customer: customerReducer,
  barcode: barcodeReducer,
  alert: alertReducer,
});
