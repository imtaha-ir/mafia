import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff99", // neon green
    },
    secondary: {
      main: "#19223a", // deep blue
    },
    background: {
      default: "#10182a", // deep blue background
      paper: "#19223a", // deep blue paper
    },
    text: {
      primary: "#e0ffe0",
      secondary: "#aaffcc",
    },
  },
  typography: {
    fontFamily: '"Vazirmatn", Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#1f2d4fff #10182a",
          scrollbarWidth: "thin",
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          background: "#10182a",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#1f2d4fff",
          borderRadius: "8px",
          boxShadow: "0 0 4px 0 #1f2d4fff",
        },
        "*::-webkit-scrollbar-track": {
          background: "#10182a",
        },
      },
    },
  },
});

export default theme;
