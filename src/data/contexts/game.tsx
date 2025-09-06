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

export type GameState = {
  id: number;
  settings: GameSettings;
  state: {
    status:
      | "NEW"
      | "PLAYERS_OK"
      | "ROLES_ASSIGNED"
      | "ROLES_VITRINE"
      | "GAME_CYCLE"
      | "FINISHED";
    gameCycleStep?:
      | "NIGHT"
      | "DAY"
      | "VOTE"
      | "EXECUTION"
      | "DISCUSSION"
      | "BLIND_DAY"
      | "END"
      | "";
  };
  logs: GameLogEntry[];
  lastPlay: number;
};

type GameContextType = {
  currentGame: GameState | null;
  storedGames: GameState[];
  createNewGame: (settings?: GameSettings) => void;
  loadGame: (id: number) => void;
  loadLastGame: () => boolean;
  saveCurrentGame: () => void;
  deleteGame: (id: number) => void;
  addLog: (message: string) => void;
  listGames: () => GameState[];
  assignRoleToPlayer: (playerId: number, role: Role) => void;
  addPlayerToCurrentGame: (players: GamePlayer[]) => void;
  removePlayerFromCurrentGame: (playerId: number) => void;
  getGamePlayers: () => GamePlayer[];
  addRoleToCurrentGame: (roles: Role[]) => void;
  assignRandomRolesToPlayers: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const LOCAL_STORAGE_KEY = "mafia_storage";

export function getStoredData(key: string) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) return [];
  try {
    const jsonData = JSON.parse(data);
    return jsonData[key] ?? [];
  } catch {
    return [];
  }
}
export function saveData(key: string, updatedData: any) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  let dataObj: any = {};
  if (data) {
    try {
      dataObj = JSON.parse(data);
    } catch {}
  }
  dataObj[key] = updatedData;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataObj));
}
/**
 * Retrieve stored games from localStorage.
 * @returns {GameState[]} Array of stored games.
 */
function getStoredGames(): GameState[] {
  return getStoredData("games");
}

/**
 * Save games array to localStorage.
 * @param {GameState[]} games - Array of games to save.
 */
function saveGamesToStorage(games: GameState[]) {
  saveData("games", games);
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
    loadLastGame();
  }, []);

  /**
   * Create a new game with the given settings.
   * @param {GameSettings} settings - Settings for the new game.
   */
  const createNewGame = (settings?: GameSettings) => {
    const newGame: GameState = {
      id: Date.now(),
      settings: settings ?? {
        name: new Date().toLocaleString(),
        players: [],
        roles: [],
      },
      state: { status: "NEW" }, // Initialize your game state here
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
   * @param {number} playerId - The ID of the player.
   * @param {Role} role - The role to assign.
   */
  const assignRoleToPlayer = (playerId: number, role: Role) => {
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

  /**
   * Add a player to the current game.
   * @param {GamePlayer} player - The player to add.
   */
  const addPlayerToCurrentGame = (players: GamePlayer[]) => {
    if (!currentGame) return;
    const updatedGame = { ...currentGame };
    updatedGame.settings.players.push(...players);
    setCurrentGame(updatedGame);
    const updatedGames = storedGames.map((g) =>
      g.id === updatedGame.id ? updatedGame : g
    );
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
  };

  /**
   * Remove a player from the current game by ID.
   * @param {number} playerId - The ID of the player to remove.
   */
  const removePlayerFromCurrentGame = (playerId: number) => {
    if (!currentGame) return;
    const updatedPlayers = currentGame.settings.players.filter(
      (player) => player.id !== playerId
    );
    const updatedGame = {
      ...currentGame,
      settings: { ...currentGame.settings, players: updatedPlayers },
    };
    setCurrentGame(updatedGame);
    const updatedGames = storedGames.map((g) =>
      g.id === updatedGame.id ? updatedGame : g
    );
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
  };

  /**
   * Get players of current game.
    @returns {GamePlayer[]} players of current game.
   */
  const getGamePlayers = () => {
    return currentGame?.settings.players ?? ([] as GamePlayer[]);
  };

  /**
   * Add a role to the current game's available roles.
   * @param {Role} role - The role to add.
   */
  const addRoleToCurrentGame = (roles: Role[]) => {
    if (!currentGame) return;
    const updatedGame = {
      ...currentGame,
    };
    updatedGame.settings.roles.push(...roles);
    setCurrentGame(updatedGame);
    const updatedGames = storedGames.map((g) =>
      g.id === updatedGame.id ? updatedGame : g
    );
    setStoredGames(updatedGames);
    saveGamesToStorage(updatedGames);
  };

  /**
   * Assign random roles from the current game's roles to its players.
   * Each player gets one random role, roles are shuffled and assigned in order.
   * If there are fewer roles than players, only that many players get roles.
   */
  const assignRandomRolesToPlayers = () => {
    if (!currentGame) return;
    const roles = [...currentGame.settings.roles];
    const players = [...currentGame.settings.players];
    // Shuffle roles
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    // Assign roles to players
    const updatedPlayers = players.map((player, idx) =>
      idx < roles.length ? { ...player, role: roles[idx] } : { ...player }
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

  /**
   * Load the most recently played game and set it as the current game.
   */
  const loadLastGame = () => {
    if (storedGames?.length === 0) return false;
    const lastGame = storedGames.reduce((prev, curr) =>
      curr.lastPlay > prev.lastPlay ? curr : prev
    );
    setCurrentGame(lastGame);
    return true;
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
        assignRoleToPlayer,
        addPlayerToCurrentGame,
        removePlayerFromCurrentGame,
        getGamePlayers,
        addRoleToCurrentGame,
        assignRandomRolesToPlayers,
        loadLastGame,
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
