import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import highlightWeekends from "react-multi-date-picker/plugins/highlight_weekends";
import KDatePickerProps from "./type";
import "./style.css";

function KDatePicker({
  numberOfMonth = 1,
  value,
  onChange,
  type,
  renderComponent,
  minDate,
  maxDate,
}: KDatePickerProps) {
  const handleChange = (date: DateObject | DateObject[] | null) => {
    if (date == null) return onChange(null);
    if (type == "multiDatePicker" || type == "rangePicker") {
      if (Array.isArray(date)) {
        date.forEach((singleDate) => {
          singleDate.hour = 0;
          singleDate.minute = 0;
          singleDate.millisecond = 0;
        });
        const timeStamps = date.map((singleDate) => singleDate.valueOf());
        onChange(timeStamps);
      } else {
        onChange(null);
      }
    } else {
      if (!Array.isArray(date)) {
        date.hour = 0;
        date.minute = 0;
        date.millisecond = 0;
        onChange(date.valueOf());
      } else {
        onChange(null);
      }
    }
  };
  return (
    <DatePicker
      render={renderComponent}
      arrow={false}
      locale={persian_fa}
      calendar={persian}
      value={value}
      onChange={handleChange}
      onOpenPickNewDate={false}
      editable={false}
      numberOfMonths={numberOfMonth}
      multiple={type == "multiDatePicker"}
      rangeHover={type == "rangePicker"}
      plugins={[highlightWeekends()]}
      maxDate={maxDate}
      minDate={minDate}
      range={type == "rangePicker"}
    />
  );
}

export default KDatePicker;
