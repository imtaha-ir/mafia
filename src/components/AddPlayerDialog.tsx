import { Box, Dialog } from "@mui/material";
import AddPlayerPage from "../pages/player-management/AddPayer";

interface AddPlayerDialogProps {
  open: boolean;
  setOpen: any;
}
export default function AddPlayerDialog({
  open,
  setOpen,
}: AddPlayerDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box p={2}>
        <AddPlayerPage setOpen={setOpen} />
      </Box>
    </Dialog>
  );
}
