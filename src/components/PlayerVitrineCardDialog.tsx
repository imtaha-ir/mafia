import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, CardActions, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useScreen } from "../data/contexts/screen";

interface PlayerVitrinCardDialog {
  avatar?: any;
  name: string;
  side?: string;
  role?: string;
  roleDesc?: string;
  open: boolean;
  onClose: () => void;
  seenCount: () => void;
}

export default function PlayerVitrinCardDialog({ avatar, name, side, role, roleDesc, open, onClose, seenCount }: PlayerVitrinCardDialog) {
  const [undrestandAvaileble, setUndrestandAvaileble] = useState<Boolean>(false);
  const [seenRole, setSeenRole] = useState<boolean>(false);
  const screen = useScreen();
  const onClosePopUp = () => {
    if (!seenRole) {
      seenCount();
      setSeenRole(true);
    }
    if (undrestandAvaileble) {
      onClose();
    } else {
      screen.showMessage("نقش بازیکن دیده نشده");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <Stack alignItems={"center"} spacing={2}>
          <Avatar src={avatar} sx={{ width: 200, height: 200 }} />
          <Typography variant="subtitle1">نام : {name}</Typography>

          <Accordion
            onClick={() => {
              setUndrestandAvaileble(true);
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">نقش</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">تیم : {side == "TOWN" ? "شهروند" : "مافیا"}</Typography>
              <Typography variant="subtitle1">نقش : {role}</Typography>
              <Typography variant="subtitle1">وظیفه : {roleDesc}</Typography>
            </AccordionDetails>
          </Accordion>
          <CardActions>
            <Button
              color={undrestandAvaileble ? "success" : "secondary"}
              variant="contained"
              onClick={() => {
                onClosePopUp();
              }}
            >
              متوجه شدم
            </Button>
          </CardActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
