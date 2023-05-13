import {map, Observable} from 'rxjs';
import {Api} from '..';

import {CenterModel} from './types';

export const getCenters = (): Observable<CenterModel[]> => {
  return new Api()
    .get<{value: CenterModel[]}>('dcodata')
    .pipe(map(item => item.value));
};
