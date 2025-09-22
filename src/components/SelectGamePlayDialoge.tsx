import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { Role } from "../types/roles.types";
import { useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import type { GamePlayer } from "../types/player.type";



interface SelectGamePlayDialogeProps{
    open:boolean;
    role:Role;
    mode:"alive"|"dead";
    onConfirm:(playerId:number)=>void;
    onClose:()=>void;
    players:GamePlayer[];
}
   

  
export default function SelectGamePlayDialoge({open,role,mode,onConfirm,onClose,players}:SelectGamePlayDialogeProps){
    const [selectedPlayerId,setSelectedPlayerId]=useState<number|null>(null)
   const handleConfirm = ()=>{
    if (selectedPlayerId !== null) {onConfirm(selectedPlayerId);
        setSelectedPlayerId(null)
    }
   };
   const filteredPlayers=players.filter(
    (p)=>(mode ==="alive" ? p.alive:!p.alive)
   );
   
    return(
    

        <Dialog open={open}  onClose={onClose} fullWidth>
            <DialogTitle>
                {role.name}:بازیکنی را انتخاب کنید 
            </DialogTitle>
               <DialogContent>
                <List>
                {filteredPlayers.map((player)=>(
                    <ListItemButton key={player.id} selected={selectedPlayerId===player.id}
                    onClick={()=>setSelectedPlayerId(player.id)}>
                        <ListItemAvatar>
                        <Avatar src={player.avatar}>
                            {player.name[0]}
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={player.name}/>
                    </ListItemButton>
                ))}
                </List>
               </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>لغو</Button>
                        <Button
                        onClick={handleConfirm}
                        disabled={selectedPlayerId===null}
                        >
                        تأیید
                        </Button>
                    </DialogActions>

        </Dialog>
    )
}