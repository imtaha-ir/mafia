import { Box, Button, Card, Fab, Grid, Paper, Typography } from "@mui/material";
import { useGame } from "../data/contexts/game";
import React, { useState } from "react";

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

  const handleDragRoleStartOnPc = (
    e: React.DragEvent,
    OriginPlayerId: number
  ) => {
    e.dataTransfer.setData("playerId", String(OriginPlayerId));
    setDraggedRolePlayerId(OriginPlayerId);
  };

  const handleDropRoleOnPc = (e: React.DragEvent, targetPlayerId: number) => {
    e.preventDefault();
    const firstPlayerId = Number(e.dataTransfer.getData("playerId"));
    swapRoles(firstPlayerId, targetPlayerId);
  };

  const handleTouchStartOnMobile = (OriginPlayerId: number) => {
    setDraggedRolePlayerId(OriginPlayerId);
  };

  const handleTouchEndOnMobile = (e: React.TouchEvent) => {
    if (!draggedRolePlayerId) return;

    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (!element) return;

    const card = element.closest("[data-player-id]");
    if (!card) return;

    const targetPlayerId = Number(card.getAttribute("data-player-id"));
    swapRoles(draggedRolePlayerId, targetPlayerId);
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

  return (
    <Paper>
      <Box p={1}>
        <Button variant="outlined" onClick={randomAssign}>
          <Typography>تصادفی</Typography>
        </Button>
      </Box>
      <Grid container spacing={1}>
        {game.getGamePlayers().map((p) => (
          <Grid p={1} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <Card
              key={p.id}
              data-player-id={p.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropRoleOnPc(e, p.id)}
              onDragEnd={() => setDraggedRolePlayerId(null)}
              onTouchEnd={handleTouchEndOnMobile}
            >
              <Grid p={2} container>
                <Grid flexGrow={1}>
                  <Typography>{p.name}</Typography>
                </Grid>
                <Grid>
                  <Typography
                    draggable={!!p.role}
                    onDragStart={(e) =>
                      p.role && handleDragRoleStartOnPc(e, p.id)
                    }
                    onDragEnd={() => setDraggedRolePlayerId(null)}
                    onTouchStart={() => handleTouchStartOnMobile(p.id)}
                  >
                    {p.role?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box p={1}>
        <Grid>
          <Fab variant="extended" color="primary" aria-label="add">
            <Typography>گام بعدی</Typography>
          </Fab>
        </Grid>
      </Box>
    </Paper>
  );
}
