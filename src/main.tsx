import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import App from "./App";
import rtlStylish from "stylis-plugin-rtl";
import Layout from "./Layout";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlStylish],
});

document.body.setAttribute("dir", "rtl");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
