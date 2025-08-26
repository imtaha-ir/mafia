import { useEffect, useState } from "react";
import type { Role } from "../types/roles.types";
import RoleDetails from "../data/static/roles.data";
import { Box, Grid, List, Typography } from "@mui/material";
import { useGame } from "../data/contexts/game";
import RoleManagementListItem from "../components/RoleManagementListItem";

export default function RolesManagement() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([RoleDetails[0]]);
  const [playersCount, setPlayerCount] = useState<number>(8);
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
  const suggestedRolls = (playersCount: number): Role[] => {
    const roles: Role[] = [];
    const fixedRoles = ["پدرخوانده", "دکتر", "کارآگاه"];
    fixedRoles.forEach((name) => {
      const role = RoleDetails.find((r) => r.name === name);
      if (role) {
        roles.push(role);
      }
    });

    let mafiaSpecialRoles = 0;

    if (playersCount >= 7) {
      const sniper = RoleDetails.find((r) => r.name === "تک تیرانداز");
      if (sniper) {
        roles.push(sniper);
      }
    }

    if (playersCount >= 8) {
      const doctorLecter = RoleDetails.find((r) => r.name === "دکتر لکتر");
      if (doctorLecter) {
        roles.push(doctorLecter);
        mafiaSpecialRoles++;
      }

      if (playersCount >= 9) {
        const strong = RoleDetails.find((r) => r.name === "جان سخت");
        if (strong) {
          roles.push(strong);
        }
      }

      if (playersCount >= 11) {
        const natasha = RoleDetails.find((r) => r.name === "ناتاشا");
        if (natasha) {
          roles.push(natasha);
          mafiaSpecialRoles++;
        }
      }

      if (playersCount >= 15) {
        const negotiator = RoleDetails.find((r) => r.name === "مذاکره کننده");
        if (negotiator) {
          roles.push(negotiator);
          mafiaSpecialRoles++;
        }
      }
    }

    const mafiaCount = Math.max(1, Math.ceil(playersCount / 3.5));
    const simpleMafiaCount = RoleDetails.find((r) => r.name === "مافیا ساده");
    if (simpleMafiaCount) {
      for (let i = 0; i < mafiaCount - 1 - mafiaSpecialRoles; i++) {
        roles.push(simpleMafiaCount);
      }
    }

    const town = RoleDetails.find((r) => r.name === "شهروند ساده");
    while (roles.length < playersCount && town) {
      roles.push(town);
    }

    return roles;
  };

  useEffect(() => {
    const suggest = suggestedRolls(playersCount);
    setSelectedRoles(suggest);
  }, [playersCount]);

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
          نقش‌های انتخاب‌شده : {selectedRoles.length} / {playersCount}
        </Typography>
      </Box>
    </Grid>
  );
}
