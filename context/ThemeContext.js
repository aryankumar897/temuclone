"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? "dark" : "light",

          primary: { main: "#ff6a00" },

          background: {
            default: dark ? "#0f172a" : "#f5f5f5",
            paper: dark ? "#1e293b" : "#ffffff",
          },

          text: {
            primary: dark ? "#f1f5f9" : "#111",
            secondary: dark ? "#94a3b8" : "#666",
          },
        },

        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                background: "transparent",
                "&:before": { display: "none" },
              },
            },
          },

          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                minHeight: "unset",
                padding: "0 16px",
              },
              content: { margin: 0 },
            },
          },

          MuiAccordionDetails: {
            styleOverrides: {
              root: { padding: 0 },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: { backgroundImage: "none" },
            },
          },
        },
      }),
    [dark]
  );

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);