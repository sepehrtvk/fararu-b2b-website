export interface CountyModel {
  id: number;
  stateRef: number;
  countyCode: number;
  countyName: string;
  uniqueId: string;
  countyGuid: string;
}

export interface AreaModel {
  id: number;
  countyRef: number;
  areaCode: number;
  areaName: string;
  uniqueId: string;
  areaGuid: string;
}
