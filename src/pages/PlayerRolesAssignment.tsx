import { Card, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useGame } from "../data/contexts/game";
import { useState } from "react";
import {
  ArrowDropDown,
  ArrowDropUp,
  FlipCameraAndroid,
} from "@mui/icons-material";

export default function PlayerRolesAssignments() {
  const game = useGame();
  const [draggedRolePlayerId, setDraggedRolePlayerId] = useState<number | null>(
    null
  );

  const randomAssign = () => {
    if (game.currentGame) {
      game.assignRandomRolesToPlayers();
    }
  };

  const swapRoles = (originPlayerId: number, targetPlayerId: number) => {
    if (!originPlayerId || originPlayerId === targetPlayerId) return;

    const Players = [...game.getGamePlayers()];
    const firstPlayer = Players.find((p) => p.id === originPlayerId);
    const finalPlayer = Players.find((p) => p.id === targetPlayerId);

    if (!firstPlayer?.role || !finalPlayer?.role) return;

    [firstPlayer.role, finalPlayer.role] = [finalPlayer.role, firstPlayer.role];
    Players.forEach((p) => p.role && game.assignRoleToPlayer(p.id, p.role));

    setDraggedRolePlayerId(null);
  };
  const players = game.getGamePlayers();

  return (
    <Paper>
      <Grid
        container
        flexWrap={"nowrap"}
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          bgcolor: "background.paper",
          justifyContent: "center",
        }}
        onClick={randomAssign}
        p={1}
      >
        <IconButton>
          <FlipCameraAndroid />
        </IconButton>
      </Grid>
      <Grid container spacing={1}>
        {game.getGamePlayers().map((p, pIndex) => (
          <Grid p={1} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <Card>
              <Grid p={2} container alignItems={"center"}>
                <Grid flexGrow={1}>
                  <Typography>{p.name}</Typography>
                </Grid>

                <Grid container alignItems={"center"}>
                  <Typography>{p.role?.name}</Typography>
                  <Grid container direction={"column"} ml={2}>
                    <IconButton
                      disabled={pIndex === 0}
                      size="small"
                      onClick={() => swapRoles(p.id, players[pIndex - 1].id)}
                    >
                      <ArrowDropUp />
                    </IconButton>
                    <IconButton
                      disabled={pIndex === players.length - 1}
                      onClick={() => swapRoles(p.id, players[pIndex + 1].id)}
                      size="small"
                    >
                      <ArrowDropDown />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
