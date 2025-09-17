import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextFABButton from "../components/NextFABButton";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useGame } from "../data/contexts/game";
import { useScreen } from "../data/contexts/screen";
import type { GamePlayer } from "../types/player.type";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function VotingPage() {
  const game = useGame();
  const screen = useScreen();
  const [playersList, setPlayersList] = useState<GamePlayer[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playersCount, setPlayersCount] = useState<number>();
  const votes: Record<number, number> = {};

  function handleFinish() {
    screen.showMessage("تغییرات ثبت شد.");
    // TODO: save and navigate to next page
  }

  useEffect(() => {
    if (game) {
      const alivePlayers = game.currentGame?.settings.players.filter(
        (pL) => pL.alive
      );
      if (alivePlayers) {
        setPlayersList(alivePlayers);
        setPlayersCount(alivePlayers?.length);
        alivePlayers.forEach((player) => {
          votes[player.id] = 0;
        });
      }
    } else {
      screen.showMessage("بازیکنی یافت نشد!");
    }
  }, []);

  return (
    <Box mt={"15%"}>
      <Stack alignItems={"center"} p={5} gap={3}>
        <Avatar
          sx={{ width: 150, height: 150 }}
          src={playersList[currentIndex]?.avatar}
        />
        <Stack>
          <Typography variant="h6">
            {playersList[currentIndex]?.name ?? "نام بازیکن"}
          </Typography>
        </Stack>
        <Stack
          gap={2}
          border={1}
          p={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body1">تعداد رای</Typography>
          <Stack flexDirection={"row"}>
            <IconButton
              onClick={() => {
                votes[currentIndex] = votes[currentIndex] + 1;
              }}
            >
              <AddIcon />
            </IconButton>
            <TextField
              sx={{ width: 30 }}
              variant="standard"
              value={votes[currentIndex] ?? 0}
              onChange={(e) => {
                votes[currentIndex] = Number(e.target.value);
              }}
            />
            <IconButton
              onClick={() => {
                votes[currentIndex] = votes[currentIndex] - 1;
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      <IconButton
        disabled={currentIndex == playersCount}
        onClick={() => {
          setCurrentIndex(currentIndex + 1);
        }}
        sx={{ position: "fixed", left: 5, top: "50%" }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton
        disabled={currentIndex == 0}
        onClick={() => {
          setCurrentIndex(currentIndex - 1);
        }}
        sx={{ position: "fixed", right: 5, top: "50%" }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <NextFABButton caption="ثبت" icon={CheckIcon} onClick={handleFinish} />
    </Box>
  );
}
