import { useState } from "react";
import type { Role } from "../types/roles.types";
import RoleDetails from "../data/static/roles.data";
import { Box, Grid, List, Typography } from "@mui/material";
import { useGame } from "../data/contexts/game";
import RoleManagementListItem from "../components/RoleManagementListItem";

export default function RolesManagement() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([RoleDetails[0]]);
  const game = useGame();
  const updateGameSettings = () => {
    if (game.currentGame) game.currentGame.settings.roles = [...selectedRoles];
  };
  const addRole = (r: Role) => {
    setSelectedRoles([...selectedRoles, r]);
  };
  const removeRole = (role: Role) => {
    const editedRoles = [...selectedRoles];
    const roleIndex = editedRoles.findIndex((r) => r.id == role.id);
    if (roleIndex >= 0) {
      editedRoles.splice(roleIndex, 1);
      setSelectedRoles(editedRoles);
    }
  };

  return (
    <Grid container spacing={2} paddingBottom={8}>
      <List sx={{ width: "100%" }}>
        {RoleDetails.map((role, rIndex) => (
          <RoleManagementListItem
            role={role}
            selectedRoles={selectedRoles}
            key={rIndex}
            onClick={addRole}
            onDelete={removeRole}
          />
        ))}
      </List>
      <Box
        position={"fixed"}
        bottom={0}
        right={0}
        left={0}
        bgcolor={"background.paper"}
        p={1}
      >
        <Typography variant="subtitle1">
          {" "}
          نقش‌های انتخاب‌شده : {selectedRoles.length} / 8
        </Typography>
      </Box>
    </Grid>
  );
}
