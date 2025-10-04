import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGame, type GameState } from "../data/contexts/game";
import { Delete } from "@mui/icons-material";
import { useScreen } from "../data/contexts/screen";
import { useNavigate } from "react-router-dom";
import { Pages } from "../Routes";

export default function SavedGames() {
  const game = useGame();
  const navigate = useNavigate();
  const gameList = game.listGames();
  const screen = useScreen();
  const getPlayersName = (g: GameState) => {
    return (
      `${g.settings.players?.length ?? 0} نفر: ` +
      g.settings.players?.map((p) => p.name).join(" ,")
    );
  };
  const handleDelete = (g: GameState) => {
    screen.confirm(
      `بازی ${g.settings.name} حذف و حافظه مربوط به آن را آزاد کنم؟`,
      "حذف بازی",
      () => {
        game.deleteGame(g.id);
      }
    );
  };
  const handleDeleteAllGames = () => {
    game.deleteAllGames();
  };
  const handleClick = (g: GameState) => {
    screen.confirm(
      `بازی ${g.settings.name} بارگذاری شود؟`,
      "بارگذاری بازی",
      () => {
        game.loadGame(g.id);
        navigate(Pages.ArrangePlayers());
      }
    );
  };

  return gameList.length === 0 ? (
    <Typography>هنوز هیچ بازی‌ای ذخیره نشده.</Typography>
  ) : (
    <List>
      <Box>
        <Button onClick={handleDeleteAllGames} variant="outlined">
          <Typography variant="button">پاک کردن همه بازی ها</Typography>
        </Button>
      </Box>
      {gameList.map((savedGame, gIndex) => (
        <ListItem
          disablePadding
          key={savedGame.id}
          sx={{ mt: 1, bgcolor: "background.paper" }}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(savedGame)}
            >
              <Delete />
            </IconButton>
          }
        >
          <ListItemButton onClick={() => handleClick(savedGame)}>
            <ListItemIcon>
              <Avatar>{gIndex + 1}</Avatar>
            </ListItemIcon>

            <ListItemText
              primary={savedGame.settings.name}
              secondary={getPlayersName(savedGame)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
