"use client";

import { TextField } from "@mui/material";

const FormTextarea = ({
  label,
  name, // ✅ IMPORTANT
  value,
  onChange,
  rows = 4,
  error,
  helperText,
  sx,
}) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={rows}
      label={label}
      name={name} // ✅ FIX
      value={value || ""} // ✅ FIX
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
        sx={sx} // ✅ APPLY
    />
  );
};

export default FormTextarea;