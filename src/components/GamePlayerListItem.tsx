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
  isActiveSpeaker?: boolean;
  challengeAllowed?: boolean;
  isMuted?: boolean;
  onChallengeRequest?: (id: number) => void;
  onStartSpeaking?: (id: number) => void;
  onPause?: (id: number) => void;
  onFinishSpeaking?: (id: number) => void;
  onPlayerClick?: (id: number) => void;
  onReset?: (id: number) => void;
  speakTime: number;
  challengeTime: number;
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
  speakTime,
}: GamePlayerListItemProps) {
  const [time, setTime] = useState(speakTime);
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
      setTime(speakTime);
    }
  }, [isActiveSpeaker]);

  const handlePauseIconButton = () => {
    setIsPlaying(false);
    onPause && onPause(player.id);
  };
  const handleResetIconButton = () => {
    onReset && onReset(player.id);
    setTime(speakTime);
    setIsPlaying(false);
  };
  const handlePlayIconButton = () => {
    setIsPlaying(true);
    onStartSpeaking && onStartSpeaking(player.id);
  };

  return (
    <ListItem
      key={player.id}
      onClick={() => {
        onPlayerClick && onPlayerClick(player.id);
      }}
      sx={{
        bgcolor: "background.paper",
        p: 2,
      }}
      secondaryAction={
        isActiveSpeaker ? (
          <Box>
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

            <IconButton onClick={handleResetIconButton}>
              <RestartAlt />
            </IconButton>
            <IconButton
              onClick={() => {
                onFinishSpeaking && onFinishSpeaking(player.id);
              }}
            >
              <Done />
            </IconButton>
          </Box>
        ) : (
          challengeAllowed &&
          !isActiveSpeaker && (
            <IconButton
              onClick={() => {
                onChallengeRequest && onChallengeRequest(player.id);
              }}
            >
              <TourSharp />
            </IconButton>
          )
        )
      }
    >
      <ListItemIcon>
        {isActiveSpeaker ? (
          <Box position="relative" display="inline-flex">
            <CircularProgress
              thickness={4}
              value={(time / speakTime) * 100}
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
              {time > 0 && <Typography variant="caption">{time}</Typography>}
            </Box>
          </Box>
        ) : (
          isMuted && <VolumeOff />
        )}
      </ListItemIcon>
      <ListItemText>{player.name}</ListItemText>
    </ListItem>
  );
}
