export interface CardexModel {
  vchDate: string;
  vchNo: number;
  vocherDesc: string;
  lastChqStatusName: string | null;
  dealerName: string;
  bedAmount: number;
  besAmount: number;
  balance: number;
  otherDesc: string | undefined;
  objectId: number;
  objectType: number;
  objectTypeName: string;
}
