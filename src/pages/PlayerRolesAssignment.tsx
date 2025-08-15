import { Button, Card, Grid, Paper, Typography } from "@mui/material";
import { useGame } from "../data/contexts/game";
import React, { useState } from "react";

export default function PlayerRolesAssignmentPage() {
  const game = useGame();

  const [draggedRolePlayerId, setDraggedRolePlayerId] = useState<number | null>(
    null
  );
  const setGame = () => {
    if (!game.loadLastGame()) {
      game.createNewGame({
        name: "Test",
        players: [
          {
            id: 1,
            name: "Player 1",
          },
          {
            id: 2,
            name: "Player 2",
          },
          {
            id: 3,
            name: "Player 3",
          },
        ],
        roles: [
          {
            id: 1,
            name: "Role 1",
            description: "",
            side: "MAFIA",
          },
          {
            id: 2,
            name: "Role 2",
            description: "",
            side: "TOWN",
          },
          {
            id: 3,
            name: "Role 3",
            description: "",
            side: "TOWN",
          },
        ],
      });
    }
  };
  const randomAssign = () => {
    if (game.currentGame) {
      game.assignRandomRolesToPlayers();
    }
  };
  const handleDragRoleStart = (e: React.DragEvent, OriginPlayerId: number) => {
    e.dataTransfer.setData("PlayerId", String(OriginPlayerId));
  };
  const handleDropRole = (e: React.DragEvent, targetPlayerId: number) => {
    e.preventDefault();
    const firstPlayerId = Number(e.dataTransfer.getData("playerId"));

    if (!firstPlayerId || firstPlayerId === targetPlayerId) return;

    const Players = [...game.getGamePlayers()];
    const firstPlayer = Players.find((p) => p.id === firstPlayerId);
    const finalPlayer = Players.find((p) => p.id === targetPlayerId);

    if (!firstPlayer?.role || !finalPlayer?.role) return;

    [firstPlayer.role, finalPlayer.role] = [finalPlayer.role, firstPlayer.role];

    Players.forEach((p) => p.role && game.assignRoleToPlayer(p.id, p.role));

    setDraggedRolePlayerId(null);
  };

  return (
    <Paper>
      <Grid container spacing={1}>
        {game.getGamePlayers().map((p) => (
          <Grid p={1} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <Card
              key={p.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropRole(e, p.id)}
              onDragEnd={() => setDraggedRolePlayerId(null)}
            >
              <Grid p={2} container>
                <Grid flexGrow={1}>
                  <Typography>{p.name}</Typography>
                </Grid>
                <Grid>
                  <Typography
                    draggable={!!p.role}
                    onDragStart={(e) => p.role && handleDragRoleStart(e, p.id)}
                    onDragEnd={() => {
                      setDraggedRolePlayerId(null);
                    }}
                  >
                    {p.role?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container p={1}>
        <Grid flexGrow={1}>
          <Button variant="contained">Next</Button>
        </Grid>
        <Grid flexGrow={0.05}>
          <Button
            variant="outlined"
            onClick={() => {
              setGame();
            }}
          >
            Set Game
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            onClick={() => {
              randomAssign();
            }}
          >
            Random
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
