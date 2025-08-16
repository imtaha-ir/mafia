import { useState } from "react";
import { usePlayerContext } from "../data/contexts/players";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputBase,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
interface MyDialogProps {
  open: boolean;
  onExit: () => void;
}
export default function PlayerSearchDialog({ open, onExit }: MyDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const playerDB = usePlayerContext();
  const allPlayers = playerDB.list;
  const handlechange = (value: any) => {
    setSearchQuery(value);
  };
  return (
    <Dialog open={open} onClose={() => onExit()}>
      <DialogContent>
        <Grid container flexDirection={"column"} flexWrap="nowrap">
          <Grid p={2}>
            <Card sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => handlechange(e.target.value)}
              />
              {searchQuery != "" && (
                <IconButton
                  type="button"
                  aria-label="search"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                >
                  <Clear />
                </IconButton>
              )}
            </Card>
          </Grid>
          <Grid flexGrow={1} p={2} sx={{ overflowY: "auto" }}>
            <Grid container gap={1} flexDirection="column">
              {allPlayers
                .filter((player) => {
                  if (!searchQuery) return true;
                  return player.name.includes(searchQuery);
                })
                .map((player) => (
                  <Grid>
                    <Card sx={{ p: 1 }}>{player.name}</Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onExit}>بستن</Button>
      </DialogActions>
    </Dialog>
  );
}
