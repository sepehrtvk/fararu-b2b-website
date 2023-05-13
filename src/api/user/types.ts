export interface RequestCodeBody {
  Userkey: string;
}

export interface LoginResult {
  token: string;
  msg: string;
  expiresAt: Date;
  code: number; // this code is used to do something after login! code = 1 means go to profile
}

export interface LoginByPasswordRequestBody {
  userKey: string;
  password: string;
}

export interface LoginByCodeRequestBody {
  userKey: string;
  Code: string;
}

export interface ForgetPasswordRequestBody {
  userKey: string;
  Code: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export interface ForgetPasswordResponseBody {
  token: string;
  expiresAt: Date;
  msg: string;
}

export interface SetPasswordRequestBody {
  Code: string;
  Password: string;
  ConfirmPassword: string;
}

export interface CodeResponse {
  code: string;
  alreadyExist: boolean;
}

export interface SignupRequestBody {
  Userkey: string;
  Code: string;
  CityId: number;
  Alias: string;
  Password: string | null;
  ConfirmPassword: string | null;
}

export interface UserInfo {
  CustomerId: number | null;
  CustomerGroupId: number | null;
  DcRef: number | null
}

export interface LoginShowRoomRequestBody {
  username: string;
  password: string;
  centerId?: number;
}

export interface PolUserOdata {
  id: number;
  alias: string;
  cityId: number;
  cityName: string;
  countyId: number;
  countyName: string;
  status: number;
  statusName: string;
  userKey: string;
  mobile: string;
}
