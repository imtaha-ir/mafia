import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import SpeakerIcon from "@mui/icons-material/RecordVoiceOver";
import ChallengeIcon from "@mui/icons-material/WarningAmber";
import CircularProgress from "@mui/material/CircularProgress";
import type { GamePlayer } from "../types/player.type";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { IconButton } from "@mui/material";
import {
  AlarmOff,
  Pause,
  PlayArrow,
  RecordVoiceOver,
  Restore,
  SkipNext,
} from "@mui/icons-material";

interface PlayerListItemProps {
  player: GamePlayer;
  isMuted?: boolean;
  isActiveSpeaker?: boolean;
  challengeAllowed?: boolean;

  onPlayerClick?: (playerId: number) => void;
  onStartSpeaking?: (playerId: number) => void;
  onPause?: (playerId: number) => void;
  onFinishSpeaking?: (playerId: number) => void;
  onStartChallenge?: (playerId: number) => void;
  onChallengeRequest?: (playerId: number) => void;
}

const SPEAKING_TIME = 6; // seconds
const CHALLENGE_TIME = 5; // seconds

const PlayerListItem: React.FC<PlayerListItemProps> = ({
  player,
  isMuted,
  isActiveSpeaker,
  challengeAllowed,
  onPlayerClick,
  onStartSpeaking,
  onPause,
  onFinishSpeaking,
  onStartChallenge,
  onChallengeRequest,
}) => {
  const [timer, setTimer] = useState<number>(SPEAKING_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      onFinishSpeaking && onFinishSpeaking(player.id);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer, onFinishSpeaking, player.id]);

  useEffect(() => {
    let challengeInterval: NodeJS.Timeout | null = null;
    if (challengeTimer !== null && challengeTimer > 0) {
      challengeInterval = setInterval(() => {
        setChallengeTimer((prev) => (prev ? prev - 1 : null));
      }, 1000);
    } else if (challengeTimer === 0) {
      setChallengeTimer(null);
    }
    return () => {
      if (challengeInterval) clearInterval(challengeInterval);
    };
  }, [challengeTimer]);
  useEffect(() => {
    if (isActiveSpeaker) {
      setTimer(SPEAKING_TIME);
    }
  }, [isActiveSpeaker]);

  const handleStartSpeaking = () => {
    setIsTimerRunning(true);
    onStartSpeaking && onStartSpeaking(player.id);
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    onPause && onPause(player.id);
  };

  const handleReset = () => {
    setTimer(SPEAKING_TIME);
    setIsTimerRunning(false);
  };

  const handleChallengeRequest = () => {
    setChallengeTimer(CHALLENGE_TIME);
    handlePause();
    onChallengeRequest && onChallengeRequest(player.id);
    onStartChallenge && onStartChallenge(player.id);
  };

  const handleNext = () => {
    // setShowRole((prev) => !prev);
  };

  const handlePlayerClick = () => {
    onPlayerClick && onPlayerClick(player.id);
  };

  return (
    <ListItem
      disablePadding
      sx={{
        border: isActiveSpeaker ? "2px solid #2196f3" : "1px solid #ccc",
        borderRadius: 2,
        mb: 1,
        bgcolor: isActiveSpeaker ? "rgba(33,150,243,0.08)" : "background.paper",
      }}
    >
      <ListItemButton onClick={() => handlePlayerClick}>
        <ListItemIcon sx={{ mr: 2 }}>
          {isActiveSpeaker &&
            (timer > 0 ? (
              <CircularProgressWithLabel
                value={(timer / SPEAKING_TIME) * 100}
                size={50}
                thickness={5}
                color={isTimerRunning ? "primary" : "warning"}
                label={timer}
              />
            ) : (
              <AlarmOff
                color="disabled"
                sx={{ height: 50, width: 50, padding: "9px" }}
              />
            ))}
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant="h6">{player.name}</Typography>}
        />
        {isActiveSpeaker && (
          <Box
            sx={{
              ml: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                onClick={isTimerRunning ? handlePause : handleStartSpeaking}
                disabled={isMuted}
              >
                {isTimerRunning ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton size="small" onClick={handleReset}>
                <Restore />
              </IconButton>
              <IconButton size="small" onClick={handleNext}>
                <SkipNext sx={{ transform: "rotate(90deg)" }} />
              </IconButton>
            </Box>
          </Box>
        )}
        {!isActiveSpeaker && (
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <IconButton
              color="error"
              size="small"
              onClick={handleChallengeRequest}
              disabled={!challengeAllowed}
            >
              {challengeTimer !== null ? (
                <CircularProgressWithLabel
                  label={challengeTimer}
                  value={(challengeTimer * 100) / CHALLENGE_TIME}
                />
              ) : (
                <RecordVoiceOver />
              )}
            </IconButton>
          </Box>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default PlayerListItem;
