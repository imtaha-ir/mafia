import { Box, Dialog, DialogContent } from "@mui/material";
import AddPlayerPage from "../pages/player-management/AddPayer";
import type { Player } from "../types/player.type";

interface AddPlayerDialogProps {
  open: boolean;
  onClose: () => void;
  onAfterSave?: (player?: Player) => void;
}
export default function AddPlayerDialog({
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
        <AddPlayerPage onAfterSave={handleAfterSave} />
      </DialogContent>
    </Dialog>
  );
}
