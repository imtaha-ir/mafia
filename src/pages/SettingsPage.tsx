
import {  Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { Pages } from "../Routes";
import {Groups2,Language} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export default function SettingsPage(){
    const navigate=useNavigate()
    return(
         <List
      sx={{ width: '100%',  bgcolor: 'background.paper' }} >
       
        <ListItem>
        <ListItemButton onClick={()=>{navigate(Pages.PlayerManagementPage())}}>
        <ListItemIcon >
          <Groups2  />
        </ListItemIcon>
        <ListItemText primary="بانک بازیکنان" />
      </ListItemButton>
      </ListItem>
  
      
        </List>

    
    )
}