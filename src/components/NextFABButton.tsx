import { Button, type SvgIconProps } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
interface NextFABButtonProps {
  caption?: string;
  icon?: React.ElementType<SvgIconProps>;
  onClick?: () => void;
  disabled?: boolean;
}
export default function NextFABButton({
  caption,
  icon: Icon,
  disabled = false,
  onClick,
}: NextFABButtonProps) {
  return (
    <Box>
      <Fab
        variant={caption ? "extended" : "circular"}
        color="primary"
        disabled={disabled}
        onClick={onClick}
        style={{ position: "fixed", right: 16, bottom: 16 }}
      >
        <Button style={{ color: "#444" }}>
          {Icon && <Icon sx={{ mr: 1 }} />}
          {caption}
        </Button>
      </Fab>
    </Box>
  );
}
