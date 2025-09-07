import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Group } from "@mui/icons-material";



type SettingItemProps = {
  title: string;
  icon: any;
  to: string;
};

function SettingItem({ title, icon, to }: SettingItemProps) {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(to)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}


export default function SettingsPage() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <SettingItem
        title="بانک بازیکنان"
        icon={<Group />}
        to="/player-management"
      />
    </List>
  );
}