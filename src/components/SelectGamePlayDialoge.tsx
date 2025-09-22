import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { Role } from "../types/roles.types";
import { useState } from "react";
import { useGame } from "../data/contexts/game";

interface SelectGamePlayDialogeProps {
  open: boolean;
  role: Role;
  mode: "alive" | "dead";
  onConfirm: (playerId: number) => void;
  onClose: () => void;
}

export default function SelectGamePlayDialoge({
  open,
  role,
  mode,
  onConfirm,
  onClose,
}: SelectGamePlayDialogeProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const game = useGame();

  const handleConfirm = () => {
    if (selectedPlayerId !== null) {
      onConfirm(selectedPlayerId);
      setSelectedPlayerId(null);
      onClose();
    }
  };
  const filteredPlayers = game
    .getGamePlayers()
    .filter((p) => (mode === "alive" ? p.alive : !p.alive));

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{role.name}، بازیکنی را انتخاب کنید</DialogTitle>
      <DialogContent>
        <List>
          {filteredPlayers.map((player) => (
            <ListItemButton
              key={player.id}
              selected={selectedPlayerId === player.id}
              onClick={() => setSelectedPlayerId(player.id)}
            >
              <ListItemAvatar>
                <Avatar src={player.avatar}>{player.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={player.name} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>لغو</Button>
        <Button onClick={handleConfirm} disabled={selectedPlayerId === null}>
          تأیید
        </Button>
      </DialogActions>
    </Dialog>
  );
}
