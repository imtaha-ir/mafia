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
  ListSubheader,
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
    <List sx={{ mb: 7 }}>
      <ListSubheader>
        <ListItemButton
          sx={{
            position: "sticky",
            top: 0,
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
      </ListSubheader>

      {players.map((p, pIndex) => (
        <ListItem
          key={p.id}
          sx={{
            mt: 1,
            bgcolor: "background.paper",
            borderRadius: 2,
            minHeight: 70,
          }}
          secondaryAction={
            <Box display="flex" alignItems="center" mr={-3}>
              <Typography mr={2}>{p.role?.name}</Typography>

              <Box display="flex" flexDirection="column">
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
          }
        >
          <ListItemText primary={p.name} />
        </ListItem>
      ))}

      <NextFABButton
        caption="ادامه"
        icon={PlayArrow}
        onClick={handleGotoNextButton}
      />
    </List>
  );
}
