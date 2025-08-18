import { useState } from "react";
import type { Role } from "../types/roles.types";
import RoleDetails from "../data/static/roles.data";
import { Box, Button, Card, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { Add } from "@mui/icons-material";

export default function RolesManagement() {
  const [selectedRoles,setSelectedRoles]=useState<Role[]> ([RoleDetails[0],RoleDetails[3],RoleDetails[5]])
  const addRole=(r:Role) => {
    setSelectedRoles([...selectedRoles,r])
      };
  const removeRole=(roleIndex:number) =>{
    const editedRoles = [...selectedRoles];
    editedRoles.splice(roleIndex,1);
    setSelectedRoles(editedRoles);
  };
 
  return (
  <Grid container spacing={2}>
    
      <Box>
        <h3>لیست نقش‌ها</h3>
        {RoleDetails.map((role) => (
          <Box key={role.id}>
            <strong>{role.name}</strong> - {role.side}
             <Button onClick={() => addRole(role)} sx={{ mr: 1 }}>
             <Add />
           </Button>
          </Box>
        ))}
      </Box>
      <Box>
        <h3>نقش‌های انتخاب‌شده</h3>
        {selectedRoles.map((role, index) => (
          <Box key={index} >
            <strong>{role.name}</strong> - {role.side}
              <Button onClick={() => removeRole(index)}>
             <DeleteIcon />
           </Button>

          </Box>
        ))}
      </Box>
    </Grid>

);

}
