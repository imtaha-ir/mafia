import { useNavigate } from "react-router-dom";
import { usePlayerContext } from "../../data/contexts/players";
import { Pages } from "../../Routes";
import { useEffect, useState } from "react";
import type { Player } from "../../types/player.type";
import {
  Box,
  Card,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

export default function PlayerManagementPage() {
  const playerDB = usePlayerContext();
  const navigate = useNavigate();
  const [playerList, setPlayerList] = useState<Player[]>([]);
  function calculateAge(dateStr?: string) {
    if (!dateStr) {
      return "-";
    }

    const birthDate = new Date(dateStr);
    const presentDate = new Date();
    let age = presentDate.getFullYear() - birthDate.getFullYear();
    if (
      presentDate.getMonth() < birthDate.getMonth() ||
      (presentDate.getMonth() == birthDate.getMonth() &&
        presentDate.getDay() < birthDate.getDay())
    ) {
      age = age - 1;
    }
    return age;
  }

  function handleDeletePlayer(id: number) {
    if (window.confirm("آیا از حذف این بازیکن مطمئن هستید؟")) {
      playerDB.delete(id);
      setPlayerList((list) => list.filter((p) => p.id !== id));
    }
  }
  function handleEditPlayer(id: number) {
    navigate(Pages.PlayerEditPage(id));
  }
  function handleAddPlayer() {
    navigate(Pages.PlayerAddPage());
  }
  useEffect(() => {
    setPlayerList(playerDB.list);
  }, []);

  return (
    <Paper>
      <Grid container spacing={2} mb={2}>
        {playerList.map((player) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <Card>
              <Box p={2}>
                <Grid container alignItems={"center"}>
                  <Typography flexGrow={1}>{player.name}</Typography>
                  <Typography flexGrow={1}>
                    {calculateAge(player.dateOfBirth) + " ساله"}
                  </Typography>
                  <Grid flexGrow={0.3}>
                    <IconButton
                      onClick={() => {
                        handleEditPlayer(player.id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Grid>
                  <IconButton onClick={() => handleDeletePlayer(player.id)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        aria-label="add"
        onClick={handleAddPlayer}
        sx={{ position: "fixed", right: 10, bottom: 10 }}
      >
        <Add />
      </Fab>
    </Paper>
  );
}
