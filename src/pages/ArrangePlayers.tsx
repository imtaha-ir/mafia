import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import PlayerSearchDialog from "../components/PlayerSearchDialog";
import { useEffect, useState } from "react";
import type { Player } from "../types/player.type";
import { useGame } from "../data/contexts/game";
import { useScreen } from "../data/contexts/screen";
import { Add, Delete } from "@mui/icons-material";

export default function ArrangePlayers() {
  const game = useGame();
  const screen = useScreen();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [arrangedPlayers, setArrangedPlayer] = useState<Player[]>([]);
  const [gameName, setGameName] = useState<string>("");

  function addPlayerToGame(newPlayer: Player): void {
    const addedPlayer = arrangedPlayers.find((player) => player.id === newPlayer.id);
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

  function getDateAndTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minuters = currentDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minuters} ${year}-${month}-${day}`;
  }

  function isEverythingOk() {
    if (gameName.trim() !== "" && arrangedPlayers.length > 4) {
      return true;
    } else {
      return false;
    }
  }
  function saveAndGotoNextPage() {
    if (isEverythingOk()) {
      game.createNewGame();
      // TODO: change game name to {gameName}
      game.addPlayerToCurrentGame(arrangedPlayers);
      // TODO: navigate to next page
    } else if (gameName.trim() === "") {
      screen.showMessage("یک نام برای بازی بنویسید.");
    } else if (arrangedPlayers.length < 5) {
      screen.showMessage("بازی با حداقل ۵ بازیکن شروع میشه!");
    }
  }
  useEffect(() => {
    setGameName(getDateAndTime());
  }, []);
  return (
    <>
      <Box my={1}>
        <Card>
          <Stack my={3} mx={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="نام بازی"
              value={gameName}
              onChange={(e) => {
                setGameName(e.target.value);
              }}
            />
          </Stack>
        </Card>
      </Box>
      <List sx={{ width: "100%" }}>
        {arrangedPlayers.map((player, pIndex) => (
          <ListItem
            key={pIndex}
            sx={{ mt: 1, bgcolor: "background.paper" }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => removePlayerFromGame(pIndex)}>
                <Delete />
              </IconButton>
            }
          >
            <ListItemIcon>{pIndex + 1}</ListItemIcon>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={player.name} secondary={player.dateOfBirth} />
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
