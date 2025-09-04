import {
  Box,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useGame } from "../data/contexts/game";
import {
  ArrowDropDown,
  ArrowDropUp,
  FlipCameraAndroid,
  PlayArrow,
} from "@mui/icons-material";
import { useEffect } from "react";
import NextFABButton from "../components/NextFABButton";
import { useNavigate } from "react-router-dom";
import { Pages } from "../Routes";

export default function PlayerRolesAssignments() {
  const game = useGame();
  const navigate = useNavigate();

  const handleGotoNextButton = () => {
    navigate(Pages.RolesVitrine());
  };

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
  };
  const players = game.getGamePlayers();
  useEffect(() => {
    randomAssign();
  }, []);

  return (
    <Paper>
      <ListItemButton
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          bgcolor: "background.paper",
          justifyContent: "center",
        }}
        onClick={randomAssign}
      >
        <ListItemIcon>
          <IconButton disableRipple>
            <FlipCameraAndroid />
          </IconButton>
        </ListItemIcon>
      </ListItemButton>
      <List>
        {players.map((p, pIndex) => (
          <ListItem
            sx={{
              mt: 1,
              bgcolor: "background.paper",
            }}
            key={p.id}
          >
            <ListItemText primary={p.name} />

            <Box display="flex" alignItems="center">
              <Typography mr={2}>{p.role?.name}</Typography>

              <Box display={"flex"} flexDirection={"column"}>
                <ListItemIcon>
                  <IconButton
                    disabled={pIndex === 0}
                    size="small"
                    onClick={() => swapRoles(p.id, players[pIndex - 1].id)}
                  >
                    <ArrowDropUp />
                  </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                  <IconButton
                    disabled={pIndex === players.length - 1}
                    size="small"
                    onClick={() => swapRoles(p.id, players[pIndex + 1].id)}
                  >
                    <ArrowDropDown />
                  </IconButton>
                </ListItemIcon>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      <NextFABButton
        caption="ادامه"
        icon={PlayArrow}
        onClick={handleGotoNextButton}
      />
    </Paper>
  );
}
