import { Box, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGame } from "../data/contexts/game";
import { type RoleSetting } from "../types/roles.types";

export default function GameSettingsPage() {
  const game = useGame();
  const [gameSettings, setGameSettings] = useState<any>({});
  const [allSettingsInfo, setAllSettingInfo] = useState<
    (RoleSetting & { name: string })[]
  >([
    {
      name: "challengesCount",
      caption: "تعداد چالش بازیکن در هر دور",
      min: 0,
      max: 1,
      default: 1,
    },
    {
      name: "challengeTimeout",
      caption: "زمان چالش",
      min: 15,
      max: 60,
      default: 20,
    },
    {
      name: "speakTimeout",
      caption: "مهلت صحبت",
      min: 30,
      max: 90,
      default: 45,
    },
  ]);
  useEffect(() => {
    const players = game.getGamePlayers();
    if (players.length) {
      console.log(players);
      const gameSettingsInfo = [...allSettingsInfo];
      players.forEach((player) => {
        if (player.role?.settings) {
          Object.keys(player.role?.settings).forEach((key) => {
            if (player.role?.settings) {
              const rSetting: RoleSetting & { name: string } = {
                name: key,
                ...player.role.settings[key],
              };
              gameSettingsInfo.push(rSetting);
            }
          });
        }
      });
      // setGameSettings()
      setAllSettingInfo(gameSettingsInfo);
    }
  }, [game]);

  const onChangeSetting = (settingName: string, newValue: number) => {
    const newSettings: any = { ...gameSettings };
    newSettings[settingName] = newValue;
    setGameSettings(newSettings);
  };

  return (
    <>
      <Box padding={3}>
        {allSettingsInfo.map((settingInfo, sIndex) => (
          <Stack flexDirection={"row"} gap={2} key={sIndex}>
            <Box width={"40%"}>
              <Typography variant="subtitle1" fontSize={15}>
                {settingInfo.caption}
              </Typography>
            </Box>

            <Box width={300}>
              <Slider
                defaultValue={settingInfo.default}
                valueLabelDisplay="auto"
                min={settingInfo.min}
                max={settingInfo.max}
                value={gameSettings[settingInfo.name]}
                onChange={(e, newValue) =>
                  onChangeSetting(settingInfo.name, newValue)
                }
              />
            </Box>
            <Typography>{gameSettings[settingInfo.name]}</Typography>
          </Stack>
        ))}
      </Box>
    </>
  );
}
