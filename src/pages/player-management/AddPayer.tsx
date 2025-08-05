import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { usePlayerContext } from "../../data/contexts/players";
import { useState } from "react";

export default function AddPlayerPage() {
  const playerDB = usePlayerContext();
  const [name, setName] = useState<string>();
  const [yearOfBirth, setYearOfBirth] = useState<number>(1360);
  const showMessage = (msg: string) => {
    alert(msg);
  };
  const handleClick = () => {
    if (name) {
      const addedPlayer = playerDB.add({ name });
      if (addedPlayer) {
        showMessage("Saved");
        setName("");
        setYearOfBirth(1360);
      } else {
        showMessage("Player exists");
      }
    } else {
      showMessage("Fill out all inputs");
    }
  };
  return (
    <>
      <Stack spacing={3} alignItems="center">
        <Avatar alt="?" src="?" sx={{ width: "200px", height: "200px" }} />

        <Stack spacing={1}>
          <TextField
            id="outlined-basic"
            label="نام و نام خوانوادگی"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            value={yearOfBirth}
            onChange={(e) => {
              setYearOfBirth(Number(e.target.value));
            }}
          />
        </Stack>
        <Box>
          <Button variant="contained" onClick={handleClick}>
            ذخیره
          </Button>
        </Box>
      </Stack>
    </>
  );
}
