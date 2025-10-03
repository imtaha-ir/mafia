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
import { Add, Delete, PlayArrow } from "@mui/icons-material";
import NextFABButton from "../components/NextFABButton";
import { Pages } from "../Routes";
import { useNavigate } from "react-router-dom";
import { convertNumbers, getAge } from "../utils/helper";

export default function ArrangePlayers() {
  const game = useGame();
  const screen = useScreen();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [arrangedPlayers, setArrangedPlayer] = useState<Player[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [gameName, setGameName] = useState<string>("");

  function addPlayerToGame(newPlayer: Player): void {
    const addedPlayer = arrangedPlayers.find(
      (player) => player.id === newPlayer.id
    );
    if (addedPlayer) {
      screen.showMessage("بازیکن قبلا انتخاب شده");
    } else {
      setArrangedPlayer([...arrangedPlayers, newPlayer]);
      setAvailablePlayers((players) =>
        players.some((p) => p.id === newPlayer.id)
          ? players
          : [...players, newPlayer]
      );
    }
  }

  function removePlayerFromGame(playerIndex: number): void {
    const newList = [...arrangedPlayers];
    const [removedPlayer] = newList.splice(playerIndex, 1);
    setArrangedPlayer(newList);
    setAvailablePlayers((players) =>
      players.filter((p) => p.id !== removedPlayer.id)
    );
  }

  function getDateAndTime() {
    return new Date().toLocaleString("FA-ir", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  function isEverythingOk() {
    if (gameName.trim() !== "" && arrangedPlayers.length >= 4) {
      return true;
    } else {
      return false;
    }
  }
  function saveAndGotoNextPage() {
    if (isEverythingOk()) {
      game.createNewGame({
        name: gameName,
        players: arrangedPlayers,
        roles: [],
      });
      navigate(Pages.ArrangeRoles());
    } else if (gameName.trim() === "") {
      screen.showMessage("یک نام برای بازی بنویسید.");
    } else if (arrangedPlayers.length < 5) {
      screen.showMessage("بازی با حداقل ۴ بازیکن شروع میشه!");
    }
  }
  useEffect(() => {
    if (game.currentGame) {
      setGameName(game.currentGame.settings.name);
      setArrangedPlayer(game.currentGame.settings.players);
      setAvailablePlayers(game.currentGame.settings.players);
    } else {
      setGameName(getDateAndTime());
    }
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
                setGameName(convertNumbers("fa", e.target.value));
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
              secondary={convertNumbers(
                "fa",
                getAge(
                  Number(convertNumbers("en", player.dateOfBirth)),
                  "jalali"
                )
              )}
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
      <NextFABButton
        icon={PlayArrow}
        caption="ادامه"
        onClick={saveAndGotoNextPage}
      />
      <PlayerSearchDialog
        open={dialogOpen}
        onExit={() => {
          setDialogOpen(false);
        }}
        onPlayerSelected={addPlayerToGame}
        availablePlayers={availablePlayers}
      />
    </>
  );
}
