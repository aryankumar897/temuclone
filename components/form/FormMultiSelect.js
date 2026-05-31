"use client";

import { TextField, MenuItem } from "@mui/material";

const FormMultiSelect = ({
  label,
  value = [],
  onChange,
  options = [],
  error,
  helperText,
}) => {
  return (
    <TextField
      select
      SelectProps={{ multiple: true }}
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FormMultiSelect;