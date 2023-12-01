import DateObject from "react-date-object";

export type SingleDateType = number | null;
export type MultiDateType = number[] | null;
export type RangePickerType = number[] | null;

export interface DatePickerDefaultProps {
  numberOfMonth?: number;
  renderComponent: JSX.Element;
  maxDate?: Date | string | number | DateObject;
  minDate?: Date | string | number | DateObject;
}

export interface SingleDatePickerProps {
  type: "datePicker";
  value: SingleDateType;
  onChange: (value: SingleDateType) => void;
}
export interface MultiDatePickerProps {
  type: "multiDatePicker";
  value: MultiDateType;
  onChange: (value: MultiDateType) => void;
}
export interface RangePickerProps {
  type: "rangePicker";
  value: RangePickerType;
  onChange: (value: RangePickerType) => void;
}

type KDatePickerProps = DatePickerDefaultProps &
  (SingleDatePickerProps | MultiDatePickerProps | RangePickerProps);

export default KDatePickerProps;
