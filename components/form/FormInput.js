"use client";

import { TextField } from "@mui/material";

const FormInput = ({ label, value, onChange, error, helperText, ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
      variant="outlined"
      sx={{
        "& .MuiInputBase-root": {
          height: "66px",
        },
      }}
      {...props}
    />
  );
};

export default FormInput;
