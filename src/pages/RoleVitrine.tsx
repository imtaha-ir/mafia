import { useGame } from "../data/contexts/game";
import PlayerVitrineCard from "../components/PlayerVitrineCard";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useScreen } from "../data/contexts/screen";

export default function RoleVitrine() {
  const { currentGame } = useGame();
  const navigate = useNavigate();
  const screen = useScreen();
  const playersAndRoles = currentGame?.settings.players;
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [playersSeenCount, setPlayersSeenCount] = useState<number>(0);
  const seenCount = () => {
    setPlayersSeenCount(playersSeenCount + 1);
  };
  const handleBackButton = () => {
    navigate(""); // i can't find
  };
  const handleNextButton = () => {
    if (playerCount === playersSeenCount) {
      navigate(""); // i can't find
    } else {
      screen.showMessage("هنوز همه بازیکن ها نقششون رو ندیدن");
    }
  };

  useEffect(() => {
    if (playersAndRoles) {
      setPlayerCount(playersAndRoles?.length);
    }
  }, [playersAndRoles]);

  return (
    <>
      {playersAndRoles?.map((playerItem) => {
        return (
          <>
            <PlayerVitrineCard
              avatar={playerItem.avatar}
              name={playerItem.name}
              role={playerItem.role?.name}
              side={playerItem.role?.side}
              roleDesc={playerItem.role?.description}
              seenCount={seenCount}
            />
          </>
        );
      })}

      <Box position={"fixed"} bottom={0} right={0} width={"100%"}>
        <Card>
          <Grid container flexGrow={1} sx={{ justifyContent: "space-between" }}>
            <Grid>
              <CardActions onClick={handleBackButton}>
                <Button color="error" variant="outlined">
                  صفحه قبل
                </Button>
              </CardActions>
            </Grid>
            <Grid>
              <CardActions onClick={handleNextButton}>
                <Button variant="contained" color={playersSeenCount === playerCount ? "success" : "inherit"}>
                  صفحه بعد
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
