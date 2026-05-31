"use client";

import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormDatePicker = ({
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!error,
            helperText: error ? helperText : "",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default FormDatePicker;