"use client";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Box, Typography } from "@mui/material";

const FormPhoneInput = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <Box>
      <PhoneInput
        country={"in"}
        value={value}
        onChange={onChange}
        inputStyle={{
          width: "100%",
          height: "56px",
        }}
      />

      {error && (
        <Typography color="error" variant="caption">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default FormPhoneInput;