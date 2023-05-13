export interface UserLoginShowRoomPayload {
  username: string;
  password: string;
  centerId?: number;
}

export interface UserLoginByPassPayload {
  username: string;
  password: string;
}

export interface UserLoginByCodePayload {
  mobile: string;
  code: string;
}

export interface LoginSuccessPayload {
  token: string;
  message: string | null;
  expiresAt: Date;
  username: string;
  code : number;
}
