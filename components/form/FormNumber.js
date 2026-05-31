"use client";

import { TextField } from "@mui/material";

const FormNumber = ({
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      type="number"
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
    />
  );
};

export default FormNumber;