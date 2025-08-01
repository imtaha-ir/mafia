import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import routes from "./Routes";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("مافیا");

  // Show back button if not on root
  const showBack = location.pathname !== "/";

  useEffect(() => {
    const r = routes.find((route) => route.pathname == location.pathname);
    setTitle(r?.title ?? "مافیا");
  }, [location.pathname]);

  function handleBack(): void {
    if (navigate.length) {
      navigate(-1);
    } else {
      navigate({ pathname: "/" });
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {title || "Mafia"}
          </Typography>
          {showBack && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleBack()}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Grid flexGrow={1} width={"100%"} position="relative">
        <Grid
          sx={{
            position: "absolute",
            overflowY: "scroll",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            scrollbarWidth: "thin",
          }}
          p={1}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
