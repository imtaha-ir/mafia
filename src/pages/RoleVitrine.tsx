import { useGame } from "../data/contexts/game";
import PlayerVitrineCard from "../components/PlayerVitrineCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreen } from "../data/contexts/screen";
import NextFABButton from "../components/NextFABButton";
import { List } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { Pages } from "../Routes";

export default function RoleVitrine() {
  const game = useGame();
  const navigate = useNavigate();
  const screen = useScreen();
  const playersAndRoles = game.currentGame?.settings.players;
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [playersSeenCount, setPlayersSeenCount] = useState<number>(0);
  const seenCount = () => {
    setPlayersSeenCount(playersSeenCount + 1);
  };
  function isEverythingOk() {
    if (playerCount !== 0 && playerCount === playersSeenCount) {
      return true;
    } else {
      return false;
    }
  }
  function goToNextPage() {
    if (isEverythingOk()) {
      navigate(Pages.OpeningDay()); // i can't find
    } else {
      screen.showMessage("هنوز همه بازیکن ها نقششون رو ندیدن!");
    }
  }
  useEffect(() => {
    if (playersAndRoles) {
      setPlayerCount(playersAndRoles?.length);
    } else {
      screen.showMessage("بازیکنی یافت نشد!");
    }
  }, [playersAndRoles]);

  return (
    <List>
      {playersAndRoles?.map((playerItem) => {
        return (
          <PlayerVitrineCard
            avatar={playerItem.avatar}
            name={playerItem.name}
            role={playerItem.role?.name}
            side={playerItem.role?.side}
            roleDesc={playerItem.role?.description}
            seenCount={seenCount}
          />
        );
      })}
      <NextFABButton icon={PlayArrow} caption="ادامه" onClick={goToNextPage} />
    </List>
  );
}
