"use client";

import { TextField, MenuItem } from "@mui/material";

const FormSelect = ({
  label,
  name, // ✅ IMPORTANT
  value,
  onChange,
  options = [],
  error,
  helperText,
  sx
}) => {
  return (
    <TextField
      select
      fullWidth
      label={label}
      name={name} // ✅ FIX
      value={value || ""} // ✅ avoid undefined
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
       sx={sx} // ✅ APPLY HERE
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FormSelect;



