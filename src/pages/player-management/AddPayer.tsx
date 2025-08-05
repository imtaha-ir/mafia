import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddPlayerPage() {
  const handleClick = () => {
    console.log("hello");
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt="?" src="?" />
      </Stack>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="نام و نام خوانوادگی"
          variant="outlined"
        />
      </Box>
      <Box component="form" noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" type="date" />
      </Box>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleClick}>
          ذخیره
        </Button>
      </Stack>
    </>
  );
}
