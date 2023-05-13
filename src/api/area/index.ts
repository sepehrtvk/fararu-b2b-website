import {map, Observable} from 'rxjs';
import {Api} from '..';

import {AreaModel, CountyModel} from './types';

export const getCounties = (): Observable<CountyModel[]> => {
  return new Api()
    .get<{value: CountyModel[]}>('CountyOData')
    .pipe(map(item => item.value));
};

export const getAreas = (): Observable<AreaModel[]> => {
  return new Api()
    .get<{value: AreaModel[]}>('AreaOData')
    .pipe(map(item => item.value));
};
