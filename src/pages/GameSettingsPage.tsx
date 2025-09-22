import { Box, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGame } from "../data/contexts/game";

export default function GameSettingsPage() {
  const game = useGame();
  const [challengesCount, setChanllengesCount] = useState<number | undefined>(
    1
  );
  const [challengeTimeout, setChanllengeTimeout] = useState<number | undefined>(
    15
  );
  const [speakTimeout, setSpeakeTimeout] = useState<number | undefined>(30);
  const [doctorSelfSaveCount, setDoctorSelfSaveCount] = useState<
    number | undefined
  >(1);
  const [sniperBulletsCount, setSniperBulletsCount] = useState<
    number | undefined
  >(1);

  const onChangeChallengesCount = (event: Event, newValue: number) => {
    setChanllengesCount(newValue);
  };
  const onChangeChallengeTimeout = (event: Event, newValue: number) => {
    setChanllengeTimeout(newValue);
  };
  const onChangeSpeakTimeout = (event: Event, newValue: number) => {
    setSpeakeTimeout(newValue);
  };
  const onChangeDoctorSelfSaveCount = (event: Event, newValue: number) => {
    setDoctorSelfSaveCount(newValue);
  };
  const onChangeSniperBulletsCount = (event: Event, newValue: number) => {
    setSniperBulletsCount(newValue);
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }
  useEffect(() => {
    if (game) {
      setChanllengeTimeout(game.currentGame?.settings.challengeTimeout);
      setChanllengesCount(game.currentGame?.settings.challengesCount);
      setSpeakeTimeout(game.currentGame?.settings.speakTimeout);
      setDoctorSelfSaveCount(game.currentGame?.settings.doctorSelfSaveCount);
      ///snipero yadam nare inja biyaram///
    }
  }, []);
  return (
    <>
      <Box padding={3}>
        <Stack flexDirection={"row"} gap={2}>
          <Box width={"40%"}>
            <Typography variant="subtitle1" fontSize={15}>
              تعداد چالش ها
            </Typography>
          </Box>
          <Box width={300}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={1}
              min={1}
              max={3}
              value={challengesCount}
              onChange={onChangeChallengesCount}
            />
          </Box>
          <Typography>{challengesCount}</Typography>
        </Stack>
      </Box>
      <Box padding={3}>
        <Stack flexDirection={"row"} gap={2}>
          <Box width={"40%"}>
            <Typography variant="subtitle1" component={"div"} fontSize={15}>
              مقدار زمان چالش
            </Typography>
          </Box>
          <Box width={300}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={5}
              marks
              min={15}
              max={60}
              value={challengeTimeout}
              onChange={onChangeChallengeTimeout}
            />
          </Box>
          <Typography>{challengeTimeout}</Typography>
        </Stack>
      </Box>
      <Box padding={3}>
        <Stack flexDirection={"row"} gap={2}>
          <Box width={"40%"}>
            <Typography variant="subtitle1" component={"div"} fontSize={15}>
              مقدار زمان حرف زدن
            </Typography>
          </Box>
          <Box width={300}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={10}
              min={30}
              max={90}
              value={speakTimeout}
              onChange={onChangeSpeakTimeout}
            />
          </Box>
          <Typography>{speakTimeout}</Typography>
        </Stack>
      </Box>
      <Box padding={3}>
        <Stack flexDirection={"row"} gap={2}>
          <Box width={"40%"}>
            <Typography variant="subtitle1" component={"div"} fontSize={15}>
              تعداد مجاز نجات خود دکتر
            </Typography>
          </Box>
          <Box width={300}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={1}
              marks
              min={1}
              max={5}
              value={doctorSelfSaveCount}
              onChange={onChangeDoctorSelfSaveCount}
            />
          </Box>
          <Typography>{doctorSelfSaveCount}</Typography>
        </Stack>
      </Box>
      <Box padding={3}>
        <Stack flexDirection={"row"} gap={2}>
          <Box width={"40%"}>
            <Typography variant="subtitle1" component={"div"} fontSize={15}>
              تعداد گلوله های تک تیرانداز
            </Typography>
          </Box>
          <Box width={300}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={1}
              marks
              min={1}
              max={3}
              value={sniperBulletsCount}
              onChange={onChangeSniperBulletsCount}
            />
          </Box>
          <Typography>{sniperBulletsCount}</Typography>
        </Stack>
      </Box>
    </>
  );
}
