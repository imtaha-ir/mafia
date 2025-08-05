import SearchIcon from '@mui/icons-material/Search';
import { useState, type SetStateAction } from 'react';
import { usePlayerContext } from '../../data/contexts/players';
import { Box, Card, IconButton, InputBase, Paper } from '@mui/material';
export default function PlayerSearchComponent() {
  const [searchQuery,setSearchQuery]=useState("");
  const playerDB=usePlayerContext()
  const allPlayers=playerDB.list
  const handlechange=(value:any)=>{
    setSearchQuery(value);
  }
  return (
    <div>
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="جستجو..."
        value={searchQuery}
        onChange={(e)=> handlechange(e.target.value)} 
      
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
          </Paper>
   
     <Box>
      {allPlayers.filter((player) => {
      if (!searchQuery) return true;
      return player. name. includes(searchQuery);
      })
      .map((player) => (
      <Card>{player.name}</Card>
      ))}
    </Box>
    </div>
  )
}   