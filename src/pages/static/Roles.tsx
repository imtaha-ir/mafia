import { Card, Grid, Typography } from "@mui/material";
import RoleDetails from "../../data/static/roles.data";

export default function RolesPage() {
  return (
    <Grid container spacing={1}>
      {RoleDetails.map((role) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <Card sx={{ p: 1 }}>
            <Typography variant="h5">{role.name}</Typography>
            <Typography variant="body1">{role.side}</Typography>
            <Typography variant="caption">{role.description}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
