import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App.tsx";
import { queryClient } from "./services";

const theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
