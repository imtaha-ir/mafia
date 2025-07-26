import { Card, Grid, Typography } from "@mui/material";
import RolesList from "../../data/static/Roles";

export default function RolesPage() {
  return (
    <Grid textAlign={"right"} container spacing={1} direction={"row-reverse"}>
      {RolesList.map((role) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <Card>
            <Typography variant="h5">{role.name}</Typography>
            <Typography variant="subtitle1">{role.side}</Typography>
            <Typography variant="subtitle1">{role.desc}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
