import React, { createContext, useContext, useState, useEffect } from "react";
import type { GamePlayer } from "../../types/player.type";
import type { Role } from "../../types/roles.types";

// Types
type GameLogEntry = {
  timestamp: number;
  message: string;
};

type GameSettings = {
  name: string;
  players: GamePlayer[];
  roles: Role[];
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
  addRoleToPlayer: (playerId: number, role: Role) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "mafia_games";

/**
 * Retrieve stored games from localStorage.
 * @returns {GameState[]} Array of stored games.
 */
function getStoredGames(): GameState[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Save games array to localStorage.
 * @param {GameState[]} games - Array of games to save.
 */
function saveGamesToStorage(games: GameState[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedGames, setStoredGames] = useState<GameState[]>([]);
  const [currentGame, setCurrentGame] = useState<GameState | null>(null);

  /**
   * Load stored games from localStorage on mount.
   */
  useEffect(() => {
    setStoredGames(getStoredGames());
  }, []);

  /**
   * Create a new game with the given settings.
   * @param {GameSettings} settings - Settings for the new game.
   */
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

  /**
   * Load a game by its ID.
   * @param {number} id - The ID of the game to load.
   */
  const loadGame = (id: number) => {
    const game = storedGames.find((g) => g.id === id) || null;
    setCurrentGame(game);
  };

  /**
   * Save the current game state to storage.
   */
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

  /**
   * Delete a game by its ID.
   * @param {number} id - The ID of the game to delete.
   */
  const deleteGame = (id: number) => {
    const updatedGames = storedGames.filter((g) => g.id !== id);
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
    if (currentGame?.id === id) setCurrentGame(null);
  };

  /**
   * Add a log entry to the current game.
   * @param {string} message - The log message.
   */
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

  /**
   * List all stored games.
   * @returns {GameState[]} Array of stored games.
   */
  const listGames = () => storedGames;

  /**
   * Assign a role to a player in the current game.
   * @param {string} playerId - The ID of the player.
   * @param {Role} role - The role to assign.
   */
  const addRoleToPlayer = (playerId: number, role: Role) => {
    if (!currentGame) return;
    const updatedPlayers = currentGame.settings.players.map((player) =>
      player.id === playerId ? { ...player, role } : player
    );
    const updatedSettings = {
      ...currentGame.settings,
      players: updatedPlayers,
    };
    const updatedGame = {
      ...currentGame,
      settings: updatedSettings,
    };
    setCurrentGame(updatedGame);
    const updatedGames = storedGames.map((g) =>
      g.id === updatedGame.id ? updatedGame : g
    );
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
  };

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
        addRoleToPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

/**
 * Hook to access the game context.
 * @returns {GameContextType} The game context.
 */
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
}
