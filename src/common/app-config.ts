export interface ApplicationConfig {
  login: "b2b" | "showroom";
  companyName: string;
  welcomeMessage: string;
  ipGeolocationApiKey: string;
  api: {
    server: {
      url: string;
      port: number;
    };
  };
  stock: {
    checkOnHandQty: boolean;
    showOnHandQty: boolean;
    showQtyNumber: boolean;
    showQtyUnits: boolean;
  };
  showPrice: boolean;
  productList: {
    showPackQty: boolean;
  };
  navigation: {
    profile: boolean;
    loginByCode: boolean;
    hasRegisteration: boolean;
    forgotPassword: boolean;
    changePassword: boolean;
    orderHistory: boolean;
    selectCustomer: boolean;
    customerRequest: boolean;
    customerCardex: boolean;
    groupsInHomeScreen: boolean;
  };
  termsAndConditions: boolean;
  userLocation: boolean;
}
export const AppConfig: ApplicationConfig = {
  login: "b2b",
  companyName: "ورانگر",
  welcomeMessage: "به اپلیکیشن B2B شرکت ورانگر خوش آمدید",
  ipGeolocationApiKey: "612150affff546da935afb89e3f27df0",

  stock: {
    checkOnHandQty: false,
    showOnHandQty: true,
    showQtyNumber: true,
    showQtyUnits: true,
  },
  showPrice: true,
  productList: {
    showPackQty: false,
  },
  navigation: {
    profile: true,
    loginByCode: true,
    hasRegisteration: true,
    forgotPassword: true,
    changePassword: true,
    orderHistory: true,
    selectCustomer: false,
    customerRequest: true,
    customerCardex: true,
    groupsInHomeScreen: true,
  },
  termsAndConditions: false,
  api: {
    server: {
      port: 12367,
      url: "http://77.238.123.10",
    },
  },
  userLocation: true,
};
