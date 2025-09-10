import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { Role } from "../types/roles.types";
import { Delete } from "@mui/icons-material";
import CharachterImages from "../assets/charachters/charachters";
import { useScreen } from "../data/contexts/screen";

interface RoleManagementListItemProps {
  role: Role;
  selectedRoles: Role[];
  key: any;
  onDelete: (role: Role) => void;
  onClick: (role: Role) => void;
  onSelectedCard: boolean;
}

export default function RoleManagementListItem({
  role,
  selectedRoles,
  key,
  onDelete,
  onClick,
  onSelectedCard,
}: RoleManagementListItemProps) {
  const screen = useScreen();
  const count = selectedRoles.filter((r) => r.id === role.id).length;
  const disableDelete = count <= role.min;
  const disableAdd = count >= role.max;
  const addRollLimit = count >= role.max || onSelectedCard;
  const selectedPlayerOpacity = disableAdd || !disableDelete;
  const handlePickRole = () => {
    if (addRollLimit) {
      screen.showMessage(
        "بیشتر از تعداد بازیکنان نمیتوانید نقش انتخاب کنید !",
        "مافیا"
      );
    } else {
      onClick(role);
    }
  };
  return (
    <ListItem
      key={key}
      sx={{ mt: 1, bgcolor: "background.paper" }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(role)}
          disabled={disableDelete}
        >
          <Delete />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        onClick={handlePickRole}
        style={selectedPlayerOpacity ? { opacity: 0.9 } : { opacity: 0.2 }}
      >
        <ListItemAvatar sx={{ mr: 2, ml: -1 }}>
          <img src={CharachterImages[role.charachterIndex ?? 0]} height={64} />
        </ListItemAvatar>
        <ListItemText primary={role.name} secondary={count} />
      </ListItemButton>
    </ListItem>
  );
}
