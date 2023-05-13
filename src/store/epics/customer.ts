import {Action} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import {Epic} from 'redux-observable';
import {catchError, filter, map, Observable, of, switchMap} from 'rxjs';
import {getUserInfo} from '../../api/user';
import {UserInfo} from '../../api/user/types';
import {setCustomer} from '../slices/customer';
import {loginFailure, loginSuccess} from '../slices/user';
import {store} from '../store';

export const customerLoginEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(action => action.type == loginSuccess.type),
    switchMap(() => {
      const user = store.getState().user;
      if (user.token) {
        var decoded: any = jwt_decode(user.token);
        return getUserInfo(decoded.id, user.token).pipe(
          map((result: UserInfo) => {
            return setCustomer({
              CustomerGroupId: result.CustomerGroupId,
              CustomerId: result.CustomerId,
              DcRef: result.DcRef
            });
          }),
          catchError(err => {
            return of(
              loginFailure({
                error: err?.response?.message
                  ? err?.response?.message
                  : err.message,
              }),
            );
          }),
        );
      } else return of();
    }),
  );
