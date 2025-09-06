import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { usePlayerContext } from "../../data/contexts/players";
import { useState } from "react";
import { useScreen } from "../../data/contexts/screen";
import type { Player } from "../../types/player.type";

interface AddPlayerPageProps {
  onAfterSave?: (player?: Player) => void;
}
export default function AddPlayerPage({ onAfterSave }: AddPlayerPageProps) {
  const playerDB = usePlayerContext();
  const [name, setName] = useState<string>();
  const [yearOfBirth, setYearOfBirth] = useState<number>(1360);
  const screen = useScreen();

  const handleClick = () => {
    if (name) {
      const addedPlayer = playerDB.add({ name });
      if (addedPlayer) {
        if (onAfterSave) {
          onAfterSave(addedPlayer);
        } else {
          screen.showMessage("ذخیره شد");
        }
        setName("");
        setYearOfBirth(1360);
      } else {
        screen.showMessage("بازیکن قبلا ثبت شده است");
      }
    } else {
      screen.showMessage("همه اطلاعات را وارد نمایید", "مافیا");
    }
  };
  return (
    <>
      <Stack spacing={3} alignItems="center">
        <Avatar sx={{ width: "200px", height: "200px" }} />

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
