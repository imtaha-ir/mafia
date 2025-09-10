import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { usePlayerContext } from "../../data/contexts/players";
import { useState } from "react";
import { useScreen } from "../../data/contexts/screen";

import type { Player } from "../../types/player.type";
import { convertNumbers } from "../../utils/helper";

interface AddPlayerPageProps {
  initialName?: string;
  onAfterSave?: (player?: Player) => void;
}
export default function AddPlayerPage({
  onAfterSave,
  initialName,
}: AddPlayerPageProps) {
  const playerDB = usePlayerContext();
  const [name, setName] = useState<string>(initialName ?? "");
  const [yearOfBirth, setYearOfBirth] = useState<string>();
  const screen = useScreen();

  const handleClick = () => {
    if (name) {
      const addedPlayer = playerDB.add({ name, dateOfBirth: yearOfBirth });
      if (addedPlayer) {
        if (onAfterSave) {
          onAfterSave(addedPlayer);
        } else {
          screen.showMessage("ذخیره شد");
        }

        setName("");
        setYearOfBirth("");
        screen.showMessage("ذخیره شد");
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
            label="نام و نام خوانوادگی"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(convertNumbers("fa", e.target.value));
            }}
          />

          <TextField
            variant="outlined"
            label="سال تولد"
            value={yearOfBirth}
            onChange={(e) => {
              setYearOfBirth(convertNumbers("fa", e.target.value));
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
