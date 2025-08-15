import { Avatar, Badge, Box, Card, Grid, Icon, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PlayerVitrinCardDialog from "./PlayerVitrineCardDialog";

interface playerCardProps {
  name: string;
  avatar?: any;
  role?: string;
  side?: string;
  roleDesc?: string;
  seenCount: () => void;
}

export default function PlayerCard({ name, avatar, role, roleDesc, side, seenCount }: playerCardProps) {
  const [displayCounter, setDisplayCounter] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const onOpenPopUp = () => {
    setDisplayCounter(displayCounter + 1);
    setOpen(!open);
    seenCount;
  };
  const onClosePopUp = () => {
    setOpen(false);
  };

  return (
    <>
      <Box my={1} onClick={onOpenPopUp}>
        <Card>
          <Grid
            container
            flexGrow={1}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid>
              <Stack p={2} direction={"row"} alignItems={"center"} spacing={2}>
                <Avatar src={avatar} sx={{ width: 60, height: 60 }} />
                <Typography variant="h6">{name}</Typography>
              </Stack>
            </Grid>
            <Grid>
              <Stack p={2}>
                <Badge badgeContent={displayCounter} anchorOrigin={{ horizontal: "left" }}>
                  <Icon color={displayCounter === 0 ? "disabled" : undefined}>{displayCounter == 0 ? <VisibilityOff /> : <Visibility />}</Icon>
                </Badge>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <PlayerVitrinCardDialog
        avatar={avatar}
        name={name}
        side={side}
        role={role}
        roleDesc={roleDesc}
        open={open}
        onClose={onClosePopUp}
        seenCount={seenCount}
      />
    </>
  );
}
