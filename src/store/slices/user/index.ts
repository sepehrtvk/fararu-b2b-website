import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  LoginSuccessPayload,
  UserLoginByCodePayload,
  UserLoginByPassPayload,
  UserLoginShowRoomPayload,
} from './payloads';

interface UserState {
  username?: string;
  id?: string;
  loading: boolean;
  token?: string;
  expiresAt?: Date;
  loginError?: string;
  loginDate?: number;
  message: string | null;
  messageCode: number;
  centerId?: number;
  usernames: string[];
}

const initialState: UserState = {
  id: undefined,
  username: undefined,
  loading: false,
  token: undefined,
  expiresAt: undefined,
  loginError: undefined,
  message: null,
  messageCode: 0,
  usernames: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginShowRoomStart: (
      state,
      action: PayloadAction<UserLoginShowRoomPayload>,
    ) => {
      state.loginError = undefined;
      state.loading = true;
      state.token = undefined;
      state.expiresAt = undefined;
      state.loginDate = undefined;
      state.centerId = action.payload.centerId;
      state.message = null;
      state.messageCode = 0;
    },
    loginByPasswordStart: (
      state,
      action: PayloadAction<UserLoginByPassPayload>,
    ) => {
      state.loginError = undefined;
      state.loading = true;
      state.token = undefined;
      state.expiresAt = undefined;
      state.loginDate = undefined;
      state.message = null;
      state.messageCode = 0;
    },
    loginByCodeStart: (
      state,
      action: PayloadAction<UserLoginByCodePayload>,
    ) => {
      state.loginError = undefined;
      state.loading = true;
      state.token = undefined;
      state.expiresAt = undefined;
      state.loginDate = undefined;
      state.message = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.loading = false;
      state.expiresAt = action.payload.expiresAt;
      state.loginDate = new Date().getTime();
      state.message = action.payload.message;
      state.messageCode = action.payload.code;
      state.usernames = [...state.usernames, action.payload.username].filter(
        (value, index, self) => self.indexOf(value) === index,
      );
    },
    loginFailure: (
      state,
      action: PayloadAction<{
        error: string;
      }>,
    ) => {
      state.loginError = action.payload.error;
      state.loading = false;
      state.token = undefined;
      state.expiresAt = undefined;
      state.loginDate = undefined;
      state.message = null;
      state.messageCode = 0;
      state.centerId = undefined;
    },
    clearError: state => {
      state.loginError = undefined;
    },
    clearMessage: state => {
      state.message = null;
      state.messageCode = 0;
    },
    logout: state => {
      state.username = undefined;
      state.id = undefined;
      state.token = undefined;
      state.expiresAt = undefined;
      state.loginDate = undefined;
      state.message = null;
      state.messageCode = 0;
      state.centerId = undefined;
    },
  },
});

export const {
  loginShowRoomStart,
  loginSuccess,
  loginFailure,
  loginByPasswordStart,
  loginByCodeStart,
  logout,
  clearError,
  clearMessage,
} = userSlice.actions;

export default userSlice.reducer;
