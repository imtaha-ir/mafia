import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PlayerSearchDialog from "../components/PlayerSearchDialog";
import { useState } from "react";
import type { Player } from "../types/player.type";
import { useGame } from "../data/contexts/game";
import { useScreen } from "../data/contexts/screen";
import { Add, Delete } from "@mui/icons-material";

export default function ArrangePlayers() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [arrangedPlayers, setArrangedPlayer] = useState<Player[]>([]);
  const game = useGame();
  const screen = useScreen();
  function addPlayerToGame(newPlayer: Player): void {
    const addedPlayer = arrangedPlayers.find(
      (player) => player.id === newPlayer.id
    );
    if (addedPlayer) {
      screen.showMessage("بازیکن قبلا انتخاب شده");
    } else {
      setArrangedPlayer([...arrangedPlayers, newPlayer]);
    }
  }

  function removePlayerFromGame(playerIndex: number): void {
    const newList = [...arrangedPlayers];
    newList.splice(playerIndex, 1);
    setArrangedPlayer(newList);
  }

  return (
    <>
      <List sx={{ width: "100%" }}>
        {arrangedPlayers.map((player, pIndex) => (
          <ListItem
            key={pIndex}
            sx={{ mt: 1, bgcolor: "background.paper" }}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removePlayerFromGame(pIndex)}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemIcon>{pIndex + 1}</ListItemIcon>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={player.name}
              secondary={player.dateOfBirth}
            />
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 1, bgcolor: "background.paper" }}>
          <ListItemButton
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <Grid container justifyContent="center" width={"100%"}>
              <Grid>
                <Add />
              </Grid>
            </Grid>
          </ListItemButton>
        </ListItem>
      </List>
      <PlayerSearchDialog
        open={dialogOpen}
        onExit={() => {
          setDialogOpen(false);
        }}
        onPlayerSelected={addPlayerToGame}
      />
    </>
  );
}
