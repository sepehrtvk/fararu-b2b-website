export default interface TableProps {
  headers: string[];
  data?: any[];
  page: number;
  setPage: (value: number) => void;
  totalElements: number;
}
