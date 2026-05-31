"use client";

import { Button } from "@mui/material";

const FormButton = ({ children, ...props }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      sx={{
        color: "white",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;
