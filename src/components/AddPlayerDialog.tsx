import { Box, Dialog, DialogContent } from "@mui/material";
import AddPlayerPage from "../pages/player-management/AddPayer";
import type { Player } from "../types/player.type";

interface AddPlayerDialogProps {
  initialName?: string;
  open: boolean;
  onClose: () => void;
  onAfterSave?: (player?: Player) => void;
}
export default function AddPlayerDialog({
  initialName,
  open,
  onClose,
  onAfterSave,
}: AddPlayerDialogProps) {
  const handleAfterSave = (p?: Player) => {
    if (onAfterSave) onAfterSave(p);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <AddPlayerPage
          onAfterSave={handleAfterSave}
          initialName={initialName}
        />
      </DialogContent>
    </Dialog>
  );
}
