"use client";

import { Autocomplete, TextField } from "@mui/material";

const FormAutocomplete = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error ? helperText : ""}
        />
      )}
    />
  );
};

export default FormAutocomplete;