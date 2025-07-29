import { Card, Grid, Typography } from "@mui/material";
import RoleDetails from "../../data/static/roles.data";

export default function RolesPage() {
  return (
    <Grid textAlign={"right"} container spacing={1}>
      {RoleDetails.map((role) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <Card>
            <Typography variant="h5">{role.name}</Typography>
            <Typography variant="subtitle1">{role.side}</Typography>
            <Typography variant="subtitle2">{role.description}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
