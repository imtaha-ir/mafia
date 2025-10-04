import { useEffect, useState } from "react";
import { usePlayerContext } from "../data/contexts/players";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Clear, Search } from "@mui/icons-material";
import type { Player } from "../types/player.type";

import AddPlayerDialog from "./AddPlayerDialog";

import { convertNumbers, getAge } from "../utils/helper";

interface MyDialogProps {
  open: boolean;
  onExit: () => void;
  onPlayerSelected?: (p: Player) => void;
  availablePlayers: Player[];
}
export default function PlayerSearchDialog({
  open,
  onExit,
  onPlayerSelected,
  availablePlayers,
}: MyDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const playerDB = usePlayerContext();
  const allPlayers = playerDB.list;
  const [playersToShow, setPlayersToShow] = useState<Player[]>([]);
  const handlechange = (value: any) => {
    setSearchQuery(value);
  };
  const handlePlayerSelect = (p: Player) => {
    if (onPlayerSelected) {
      onPlayerSelected(p);
      setPlayersToShow((selectedPlayer) =>
        selectedPlayer.filter((player) => player.id !== p.id)
      );
    }
  };
  const [addPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);
  useEffect(() => {
    const found = allPlayers.filter((player) => {
      if (!searchQuery) return true;
      return player.name.includes(searchQuery);
    });

    let filtered = found;
    if (availablePlayers) {
      filtered = found.filter(
        (player) => !availablePlayers.some((p) => p.id === player.id)
      );
    }

    setPlayersToShow((currentList) => {
      const same =
        currentList.length === filtered.length &&
        currentList.every((p, i) => p.id === filtered[i].id);
      return same ? currentList : filtered;
    });
  }, [searchQuery, availablePlayers, allPlayers]);

  function handleAddPlayerclose(): void {
    setAddPlayerOpen(false);
  }

  function handleAfterSave(player?: Player | undefined): void {
    if (player) {
      handlePlayerSelect(player);
      handleAddPlayerclose();
    }
  }

  return (
    <Dialog open={open} onClose={() => onExit()}>
      <DialogTitle>
        <Card sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => handlechange(e.target.value)}
          />
          {searchQuery != "" ? (
            <IconButton
              type="button"
              aria-label="search"
              onClick={() => {
                setSearchQuery("");
              }}
            >
              <Clear />
            </IconButton>
          ) : (
            <IconButton type="button" aria-label="search">
              <Search />
            </IconButton>
          )}
        </Card>
      </DialogTitle>
      <DialogContent style={{ height: "50dvh" }}>
        <Grid container flexDirection={"column"} flexWrap="nowrap">
          <Grid flexGrow={1} p={2} sx={{ overflowY: "auto" }}>
            <List sx={{ width: "100%" }}>
              {playersToShow.map((player, pIndex) => {
                return (
                  <ListItem
                    key={pIndex}
                    sx={{ mt: 1, bgcolor: "background.paper" }}
                    disablePadding
                  >
                    <ListItemButton onClick={() => handlePlayerSelect(player)}>
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
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <AddPlayerDialog
          open={addPlayerOpen}
          onClose={handleAddPlayerclose}
          onAfterSave={handleAfterSave}
          initialName={searchQuery}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onExit}>بستن</Button>

        <Button
          onClick={() => {
            setAddPlayerOpen(!addPlayerOpen);
          }}
        >
          اضافه کردن بازیکن جدید
        </Button>
      </DialogActions>
    </Dialog>
  );
}
