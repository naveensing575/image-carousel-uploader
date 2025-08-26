import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? { background: { default: "#fafafa" } }
        : { background: { default: "#121212" } }),
    },
  });
