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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ScreenContext } from "./data/contexts/screen";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("مافیا");
  const [message, setMessage] = useState<string | null>(null);
  const [dialogTitle, setDialogTitle] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [onOk, setOnOk] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>();

  // Show back button if not on root
  const showBack = location.pathname !== "/";

  useEffect(() => {
    const r = routes.find((route) => route().pathname == location.pathname);
    setTitle(r ? r().title : "مافیا");
  }, [location.pathname]);

  function handleBack(): void {
    if (navigate.length) {
      navigate(-1);
    } else {
      navigate({ pathname: "/" });
    }
  }

  const showMessage = (msg: string, title?: string) => {
    setDialogTitle(title ?? null);
    setMessage(msg);
  };

  const confirm = (
    msg: string,
    title: string | undefined,
    onOkClick: () => void,
    onCancelClick?: () => void
  ) => {
    setDialogTitle(title ?? null);
    setMessage(msg);
    setOnOk(() => onOkClick);
    setOnCancel(() => onCancelClick);
    setConfirmOpen(true);
  };

  function handleConfirmClose(
    event?: {},
    reason?: "backdropClick" | "escapeKeyDown"
  ): void {
    if (onCancel) {
      onCancel();
    }
    setMessage(null);
    setOnCancel(undefined);
    setOnOk(() => {});
    setConfirmOpen(false);
  }
  function handleConfirmOk() {
    onOk();
    setMessage(null);
    setOnCancel(undefined);
    setOnOk(() => {});
    setConfirmOpen(false);
  }

  return (
    <ScreenContext.Provider value={{ showMessage, confirm }}>
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
        <Dialog open={Boolean(message)} onClose={() => setMessage(null)}>
          <DialogTitle>{dialogTitle ?? ""}</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <Button onClick={() => setMessage(null)}>باشه</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>{dialogTitle ?? ""}</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmOk}>بله</Button>
            <Button onClick={handleConfirmClose}>خیر</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ScreenContext.Provider>
  );
};

export default Layout;
