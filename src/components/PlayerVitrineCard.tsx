import { Avatar, Badge, Icon, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PlayerVitrinCardDialog from "./PlayerVitrineCardDialog";

interface playerCardProps {
  name: string;
  avatar?: any;
  role?: string;
  side?: string;
  roleDesc?: string;
  seenCount: () => void;
}

export default function PlayerCard({ name, avatar, role, roleDesc, side, seenCount }: playerCardProps) {
  const [displayCounter, setDisplayCounter] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const addDisplayCounter = () => {
    setDisplayCounter(displayCounter + 1);
  };
  return (
    <ListItem sx={{ my: 1, bgcolor: "background.paper", p: 0 }}>
      <ListItemButton
        onClick={() => {
          setOpen(true);
        }}
        sx={{ p: "20px 0px 20px 20px" }}
      >
        <ListItemAvatar>
          <Avatar src="" alt="" />
        </ListItemAvatar>
        <ListItemText primary={name} />
        <ListItemIcon>
          <Badge badgeContent={displayCounter} anchorOrigin={{ horizontal: "left" }}>
            <Icon color={displayCounter === 0 ? "disabled" : undefined}>{displayCounter == 0 ? <VisibilityOff /> : <Visibility />}</Icon>
          </Badge>
        </ListItemIcon>
      </ListItemButton>
      <PlayerVitrinCardDialog
        avatar={avatar}
        name={name}
        side={side}
        role={role}
        roleDesc={roleDesc}
        open={open}
        setOpen={setOpen}
        seenCount={seenCount}
        addDisplayCounter={addDisplayCounter}
      />
    </ListItem>
  );
}
