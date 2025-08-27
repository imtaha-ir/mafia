import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
interface NextFABButtonProps {
  caption?: string;
  icon?: any;
  onClick: () => void;
  isdisabled: boolean;
}
export default function NextFABButton({
  caption,
  icon,
  isdisabled,
}: NextFABButtonProps) {
  return (
    <Box>
      <Fab variant="extended" color="primary" disabled={isdisabled}>
        <Button>
          {icon}
          {caption}
        </Button>
      </Fab>
    </Box>
  );
}
