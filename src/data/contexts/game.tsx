import React, { createContext, useContext, useState, useEffect } from "react";

// Types
type GameLogEntry = {
  timestamp: number;
  message: string;
};

type GameSettings = {
  name: string;
  players: string[];
  // ...add more settings as needed
};

type GameState = {
  id: number;
  settings: GameSettings;
  state: any; // Replace with your actual game state type
  logs: GameLogEntry[];
  lastPlay: number;
};

type GameContextType = {
  currentGame: GameState | null;
  storedGames: GameState[];
  createNewGame: (settings: GameSettings) => void;
  loadGame: (id: number) => void;
  saveCurrentGame: () => void;
  deleteGame: (id: number) => void;
  addLog: (message: string) => void;
  listGames: () => GameState[];
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "mafia_games";

function getStoredGames(): GameState[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveGamesToStorage(games: GameState[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedGames, setStoredGames] = useState<GameState[]>([]);
  const [currentGame, setCurrentGame] = useState<GameState | null>(null);

  useEffect(() => {
    setStoredGames(getStoredGames());
  }, []);

  const createNewGame = (settings: GameSettings) => {
    const newGame: GameState = {
      id: Date.now(),
      settings,
      state: {}, // Initialize your game state here
      logs: [],
      lastPlay: Date.now(),
    };
    setCurrentGame(newGame);
    const updatedGames = [newGame, ...storedGames];
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
  };

  const loadGame = (id: number) => {
    const game = storedGames.find((g) => g.id === id) || null;
    setCurrentGame(game);
  };

  const saveCurrentGame = () => {
    if (!currentGame) return;
    const updatedGame = { ...currentGame, lastPlay: Date.now() };
    const updatedGames = storedGames.map((g) =>
      g.id === updatedGame.id ? updatedGame : g
    );
    setStoredGames(updatedGames);
    setCurrentGame(updatedGame);
    saveGamesToStorage(updatedGames);
  };

  const deleteGame = (id: number) => {
    const updatedGames = storedGames.filter((g) => g.id !== id);
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
    if (currentGame?.id === id) setCurrentGame(null);
  };

  const addLog = (message: string) => {
    if (!currentGame) return;
    const logEntry: GameLogEntry = {
      timestamp: Date.now(),
      message,
    };
    const updatedGame = {
      ...currentGame,
      logs: [...currentGame.logs, logEntry],
    };
    setCurrentGame(updatedGame);
    const updatedGames = storedGames.map((g) =>
      g.id === updatedGame.id ? updatedGame : g
    );
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
  };

  const listGames = () => storedGames;

  return (
    <GameContext.Provider
      value={{
        currentGame,
        storedGames,
        createNewGame,
        loadGame,
        saveCurrentGame,
        deleteGame,
        addLog,
        listGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
}
