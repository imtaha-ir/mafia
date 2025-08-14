import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState, type CSSProperties } from "react";
import { useGame } from "../data/contexts/game";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function RoleVitrine() {
  const { currentGame } = useGame();
  const playersAndRoles = currentGame?.settings.players;
  return (
    <Box py={1}>
      {playersAndRoles?.map((playerItem) => {
        return (
          <>
            <PlayerCard
              avatar={playerItem.avatar}
              name={playerItem.name}
              age={playerItem.dateOfBirth}
              role={playerItem.role?.name}
              side={playerItem.role?.side}
              roleDesc={playerItem.role?.shortDescription}
            />
          </>
        );
      })}
    </Box>
  );
}
interface playerCardProps {
  name?: string;
  avatar?: any;
  age?: string;
  role?: string;
  side?: string;
  roleDesc?: string;
}
function PlayerCard({ name, age, avatar, role, roleDesc, side }: playerCardProps) {
  const playerCardStyle: CSSProperties = { width: "45%", display: "inline-block", margin: 3, position: "relative", overflow: "visible" };
  const counterStyle: CSSProperties = {
    position: "absolute",
    top: -10,
    left: -10,
    backgroundColor: "rgb(90 90 90)",
    textAlign: "center",
    borderRadius: "50%",
    width: 20,
    height: 20,
  };
  const [displayCounter, setDisplayCounter] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const onOpenPopUp = () => {
    setDisplayCounter(displayCounter + 1);
    setOpen(!open);
  };

  return (
    <>
      <Card style={playerCardStyle} onClick={onOpenPopUp}>
        <Avatar src={avatar} style={{ width: 60, height: 60 }} />
        <Typography variant="h6">{name}</Typography>
        <span style={counterStyle}>{displayCounter}</span>
      </Card>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        <DialogContent>
          <Avatar src={avatar} sx={{ width: 200, height: 200 }} />
          <Typography variant="subtitle1">نام : {name}</Typography>
          <Typography variant="subtitle1">سن : {age}</Typography>
          <Accordion>
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
              color="success"
              variant="contained"
              onClick={() => {
                setOpen(!open);
              }}
            >
              متوجه شدم
            </Button>
          </CardActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
