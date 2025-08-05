import { useParams, useNavigate } from "react-router-dom";
import { usePlayerContext } from "../../data/contexts/players";
import { Avatar, Box, Button, CardActions, Stack, TextField } from "@mui/material";
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
    <Stack m={1} mt={4} alignItems="center">
      <Avatar src="" alt="" sx={{ width: 200, height: 200, mb: 2 }} />

      <Box m={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="نام"
          value={playerData?.name}
          sx={{ mb: 2 }}
          onChange={(e) => {
            if (playerData) {
              setPlayerData({ ...playerData, name: e.target.value });
            }
          }}
        />

        <TextField
          fullWidth
          label="سال تولد"
          variant="outlined"
          sx={{ mb: 2 }}
          value={playerData?.dateOfBirth}
          onChange={(e) => {
            if (playerData) {
              setPlayerData({ ...playerData, dateOfBirth: e.target.value });
            }
          }}
        />
      </Box>
      <CardActions>
        <Button onClick={handleCancelButton} variant="outlined">
          لغو
        </Button>
        <Button onClick={handleSaveButton} variant="contained" color="primary">
          ذخیره
        </Button>
      </CardActions>
    </Stack>
  );
}
