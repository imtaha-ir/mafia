import {
  Box,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Player } from "../types/player.type";
import {
  Done,
  Pause,
  PlayArrow,
  RestartAlt,
  TourSharp,
  VolumeOff,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

interface GamePlayerListItemProps {
  player: Player;
  isActiveSpeaker: boolean;
  challengeAllowed: boolean;
  isMuted: boolean;
  onChallengeRequest: (id: number) => void;
  onStartSpeaking: (id: number) => void;
  onPause: (id: number) => void;
  onFinishSpeaking: (id: number) => void;
  onPlayerClick: (id: number) => void;
  onReset: (id: number) => void;
  progressTime: number;
}

export default function GamePlayerListItem({
  player,
  isActiveSpeaker,
  challengeAllowed,
  isMuted,
  onChallengeRequest,
  onStartSpeaking,
  onPause,
  onFinishSpeaking,
  onPlayerClick,
  onReset,
  progressTime,
}: GamePlayerListItemProps) {
  const [time, setTime] = useState(progressTime);
  const [isPlaying, setIsPlaying] = useState(isActiveSpeaker);

  useEffect(() => {
    if (!isActiveSpeaker || !isPlaying) return;

    if (time <= 0) {
      setIsPlaying(false);
      return;
    }

    const interval = setInterval(() => {
      setTime((lastTime) => (lastTime > 0 ? lastTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isActiveSpeaker, isPlaying]);

  useEffect(() => {
    setIsPlaying(isActiveSpeaker);
    if (isActiveSpeaker) {
      setTime(progressTime);
    }
  }, [isActiveSpeaker]);

  const handlePauseIconButton = () => {
    setIsPlaying(false);
    onPause(player.id);
  };
  const handleResetIconButton = () => {
    onReset(player.id);
    setTime(progressTime);
    setIsPlaying(false);
  };
  const handlePlayIconButton = () => {
    setIsPlaying(true);
    onStartSpeaking(player.id);
  };

  return (
    <ListItem
      key={player.id}
      onClick={() => {
        onPlayerClick(player.id);
      }}
      sx={{
        mt: 1,
        bgcolor: "background.paper",
        borderRadius: 2,
        minHeight: 70,
      }}
      secondaryAction={
        <Box display="flex" alignItems="center">
          <ListItemText>{player.name}</ListItemText>
          <ListItemIcon>
            {isActiveSpeaker ? (
              <Box
                position="relative"
                display="inline-flex"
                style={{ marginRight: "20%" }}
              >
                <CircularProgress
                  thickness={4}
                  value={(time / progressTime) * 100}
                  variant="determinate"
                />
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {time > 0 && (
                    <Typography variant="caption">{time}</Typography>
                  )}
                </Box>
              </Box>
            ) : (
              isMuted && <VolumeOff style={{ marginRight: "40%" }} />
            )}
          </ListItemIcon>
        </Box>
      }
    >
      <ListItemIcon>
        {isActiveSpeaker ? (
          <Box>
            <IconButton
              onClick={() => {
                onFinishSpeaking(player.id);
              }}
            >
              <Done />
            </IconButton>
            <IconButton onClick={handleResetIconButton}>
              <RestartAlt />
            </IconButton>
            {isPlaying ? (
              <IconButton onClick={handlePauseIconButton}>
                <Pause />
              </IconButton>
            ) : (
              !isPlaying && (
                <IconButton onClick={handlePlayIconButton}>
                  <PlayArrow />
                </IconButton>
              )
            )}
          </Box>
        ) : (
          challengeAllowed &&
          !isActiveSpeaker && (
            <IconButton
              onClick={() => {
                onChallengeRequest(player.id);
              }}
            >
              <TourSharp />
            </IconButton>
          )
        )}
      </ListItemIcon>
    </ListItem>
  );
}
