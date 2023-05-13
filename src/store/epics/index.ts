import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {updateBasketEpic, deleteBasketEpic} from './basket';
import {loginByCodeEpic, lognByPassEpic, lognShowRoomEpic} from './user';
import {customerLoginEpic} from './customer';

export const rootEpic = combineEpics(
  updateBasketEpic,
  deleteBasketEpic,
  loginByCodeEpic,
  lognByPassEpic,
  lognShowRoomEpic,
  customerLoginEpic,
);
export const epicMiddleware = createEpicMiddleware();
