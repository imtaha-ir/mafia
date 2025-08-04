import { useParams, useNavigate } from "react-router-dom";
import { usePlayerContext } from "../../data/contexts/players";
import { Avatar, Box, Button, CardActions, Input, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { Player } from "../../types/player.type";

export default function EditPlayerPage() {
  const { id } = useParams();
  const playerId = id ? Number(id) : null;
  const navigate = useNavigate();
  const playerDB = usePlayerContext();
  const [playerData, setPlayerData] = useState<Player>();

  useEffect(() => {
    if (playerId !== null) {
      const p = playerDB.get(playerId);
      if (p) {
        setPlayerData(p);
      }
    }
  }, [playerId]);
  const handleSaveButton = () => {
    if (!playerData) return;
    const { id, ...updates } = playerData;
    const updated = playerDB.apply(id, updates);
    if (updated) {
      alert("تغییرات اعمال شد");
    } else {
      alert("بازیکن پیدا نشد");
    }
    navigate("/player-management");
  };
  const handleCancelButton = () => {
    navigate("/player-management");
  };
  return (
    <Box m={8}>
      <Avatar sx={{ width: 250, height: 250, mb: 2 }} />

      <TextField
        fullWidth
        placeholder="Name"
        variant="standard"
        value={playerData?.name}
        sx={{ mb: 2 }}
        onChange={(e) => {
          if (playerData) {
            setPlayerData({ ...playerData, name: e.target.value });
          }
        }}
      />

      <Input
        type="date"
        value={playerData?.dateOfBirth}
        sx={{ mb: 2 }}
        onChange={(e) => {
          if (playerData) {
            setPlayerData({ ...playerData, dateOfBirth: e.target.value });
          }
        }}
      />

      <CardActions>
        <Button onClick={handleCancelButton} variant="outlined">
          لغو
        </Button>
        <Button onClick={handleSaveButton} variant="contained" color="primary">
          ذخیره
        </Button>
      </CardActions>
    </Box>
  );
}
