import { Card, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <Grid container p={2} direction="column">
      <Typography variant="h3">Test Menu</Typography>
      <Grid container gap={2}>
        <Card>
          <Grid container p={2}>
            <Link to="/how-to-play">How to play</Link>
          </Grid>
        </Card>
        <Card>
          <Grid container p={2}>
            <Link to="/moderator-guide">Game Moderator Guide</Link>
          </Grid>
        </Card>
        <Card>
          <Grid container p={2}>
            <Link to="/roles">Roles Guide</Link>
          </Grid>
        </Card>
        <Card>
          <Grid container p={2}>
            <Link to="/faq">FAQ</Link>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
