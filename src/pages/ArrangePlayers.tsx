import { Button } from "@mui/material";
import PlayerSearchDialog from "../components/PlayerSearchDialog";
import { useState } from "react";

export default function ArrangePlayers() {
  const [dialogopen, setDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Add
      </Button>
      <PlayerSearchDialog
        open={dialogopen}
        onExit={() => {
          setDialogOpen(false);
        }}
      />
    </>
  );
}
