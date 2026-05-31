"use client";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormPassword = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value || ""}
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
      variant="outlined"
      sx={{
        "& .MuiInputBase-root": {
          height: "66px",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FormPassword;