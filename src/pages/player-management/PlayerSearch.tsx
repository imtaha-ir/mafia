import SearchIcon from "@mui/icons-material/Search";
import { useState, type SetStateAction } from "react";
import { usePlayerContext } from "../../data/contexts/players";
import { Box, Card } from "@mui/material";
export default function PlayerSearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const playerDB = usePlayerContext();
  const allPlayers = playerDB.list;

  const handlechange = (value: any) => {
    setSearchQuery(value);
  };
  return (
    <div>
      <SearchIcon />
      <input
        placeholder="Type to search..."
        value={searchQuery}
        onChange={(e) => handlechange(e.target.value)}
      />
      <Box>
        {allPlayers
          .filter((player) => {
            if (!searchQuery) return true;
            return player.name.includes(searchQuery);
          })
          .map((player) => (
            <Card>{player.name}</Card>
          ))}
      </Box>
    </div>
  );
}
