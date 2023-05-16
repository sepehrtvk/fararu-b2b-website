import { combineReducers } from "redux";
import configReducer from "./config";
import userReducer from "./user";
import basketReducer from "./basket";
import barcodeReducer from "./barcode";
import customerReducer from "./customer";
import alertReducer from "./alert";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
  blacklist: ["loading"],
};

const configPersistConfig = {
  key: "config",
  version: 1,
  storage,
};
const basketPersistConfig = {
  key: "basket",
  version: 1,
  storage,
};
const customerPersistConfig = {
  key: "customer",
  version: 1,
  storage,
};

export default combineReducers({
  config: persistReducer(configPersistConfig, configReducer),
  user: persistReducer(userPersistConfig, userReducer),
  basket: persistReducer(basketPersistConfig, basketReducer),
  customer: persistReducer(customerPersistConfig, customerReducer),
  barcode: barcodeReducer,
  alert: alertReducer,
});
