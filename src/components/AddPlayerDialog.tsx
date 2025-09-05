import { Button, Dialog } from "@mui/material";
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
      <AddPlayerPage />
      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        بستن
      </Button>
    </Dialog>
  );
}
