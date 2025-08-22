import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, CardActions, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, type Dispatch, type SetStateAction } from "react";

interface PlayerVitrinCardDialog {
  name: string;
  avatar?: any;
  side?: string;
  role?: string;
  roleDesc?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  seenCount: () => void;
  addDisplayCounter: () => void;
}

export default function PlayerVitrinCardDialog({
  avatar,
  name,
  side,
  role,
  roleDesc,
  open,
  setOpen,
  seenCount,
  addDisplayCounter,
}: PlayerVitrinCardDialog) {
  const [seenRole, setSeenRole] = useState<boolean>(false);
  const [onesSeenRole, setOnesSeenRole] = useState<boolean>(true);
  const onClosePopUp = () => {
    if (onesSeenRole && seenRole) {
      seenCount();
      setOnesSeenRole(false);
      addDisplayCounter();
    } else if (seenRole) {
      addDisplayCounter();
    }
    setSeenRole(false);
    setOpen(false);
  };
  const onAccordionOpen = () => {
    setSeenRole(true);
  };

  return (
    <Dialog open={open} onClose={onClosePopUp}>
      <DialogContent>
        <Stack alignItems={"center"} spacing={2}>
          <Avatar src={avatar} sx={{ width: 200, height: 200 }} />
          <Typography variant="subtitle1">نام : {name}</Typography>

          <Accordion onClick={onAccordionOpen}>
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
            <Button color="success" variant="contained" onClick={onClosePopUp}>
              بستن
            </Button>
          </CardActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
