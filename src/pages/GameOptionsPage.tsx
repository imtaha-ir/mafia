import { Box, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGame } from "../data/contexts/game";
import { type RoleSetting } from "../types/roles.types";

interface OptionsInfo {
  title: string;
  id: number;
  settings: (RoleSetting & { name: string })[];
}

const generalOptions: OptionsInfo = {
  title: "عمومی",
  id: 0,
  settings: [
    {
      name: "challengesCount",
      caption: "تعداد چالش بازیکن در هر دور",
      min: 0,
      max: 2,
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
  ],
};

export default function GameOptionsPage() {
  const game = useGame();
  const [gameOptions, setGameOptions] = useState<any>({});
  const [allSettingsInfo, setAllSettingInfo] = useState<OptionsInfo[]>([
    generalOptions,
  ]);
  useEffect(() => {
    const players = game.getGamePlayers();
    if (players.length) {
      console.log(players);
      const gameOptionsInfo = [...allSettingsInfo];
      players.forEach((player) => {
        if (player.role?.settings) {
          const roleSettings: (RoleSetting & { name: string })[] = [];
          Object.keys(player.role?.settings).forEach((key) => {
            if (player.role?.settings) {
              const rSetting: RoleSetting & { name: string } = {
                name: key,
                ...player.role.settings[key],
              };
              roleSettings.push(rSetting);
            }
          });
          gameOptionsInfo.push({
            title: player.role.name,
            id: player.role.id,
            settings: roleSettings,
          });
        }
      });
      // setGameOptions()
      gameOptionsInfo.sort((a, b) => a.id - b.id);
      setAllSettingInfo(gameOptionsInfo);
    }
  }, [game]);

  const onChangeSetting = (settingName: string, newValue: number) => {
    const newSettings: any = { ...gameOptions };
    newSettings[settingName] = newValue;
    setGameOptions(newSettings);
  };

  return (
    <>
      <Box padding={3}>
        {allSettingsInfo.map((settingGroup, sIndex) => (
          <Stack gap={2} key={sIndex}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight={"bold"} mb={1}>
                {settingGroup.title}
              </Typography>
              {settingGroup.settings.map((settingInfo, sIndex) => (
                <Stack flexDirection={"row"} gap={2} key={sIndex}>
                  <Box width={"40%"}>
                    <Typography variant="caption">
                      {settingInfo.caption}
                    </Typography>
                  </Box>

                  <Box width={300}>
                    <Slider
                      defaultValue={settingInfo.default}
                      valueLabelDisplay="auto"
                      min={settingInfo.min}
                      max={settingInfo.max}
                      value={gameOptions[settingInfo.name]}
                      onChange={(e, newValue) =>
                        onChangeSetting(settingInfo.name, newValue)
                      }
                    />
                  </Box>
                  <Typography>{gameOptions[settingInfo.name]}</Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        ))}
      </Box>
    </>
  );
}
