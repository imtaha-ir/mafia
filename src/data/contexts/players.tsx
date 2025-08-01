import React, { createContext, useContext, useMemo } from "react";
import type { Player } from "../../types/player.type";

const STORAGE_KEY = "players";

function loadPlayers(): Player[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function savePlayers(players: Player[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

/**
 * PlayerContext manages a list of players with localStorage persistence.
 * Provides methods to add, update, retrieve, and search players.
 */
class PlayerContext {
  private players: Player[];

  constructor() {
    this.players = loadPlayers();
  }

  /**
   * Generates a new unique player ID.
   * @returns {number} New player ID.
   */
  newId(): number {
    return this.players.length > 0
      ? Math.max(...this.players.map((p) => p.id)) + 1
      : 1;
  }

  /**
   * Adds a new player to the list and saves to localStorage.
   * Prevents adding players with duplicate names.
   * @param user Player data without ID.
   * @returns {Player | undefined} The newly added player with ID, or undefined if name exists.
   */
  add(user: Omit<Player, "id">): Player | undefined {
    if (this.players.some((p) => p.name === user.name)) {
      // Name already exists, do not add duplicate
      return undefined;
    }
    const player: Player = { ...user, id: this.newId() };
    this.players.push(player);
    savePlayers(this.players);
    return player;
  }

  /**
   * Updates an existing player by ID and saves to localStorage.
   * @param id Player ID.
   * @param userUpdates Partial player data to update.
   * @returns {Player | undefined} The updated player, or undefined if not found.
   */
  apply(
    id: number,
    userUpdates: Partial<Omit<Player, "id">>
  ): Player | undefined {
    const idx = this.players.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.players[idx] = { ...this.players[idx], ...userUpdates };
    savePlayers(this.players);
    return this.players[idx];
  }

  /**
   * Retrieves a player by ID.
   * @param id Player ID.
   * @returns {Player | undefined} The player, or undefined if not found.
   */
  get(id: number): Player | undefined {
    return this.players.find((p) => p.id === id);
  }

  /**
   * Returns a list of all players.
   */
  get list(): Player[] {
    return [...this.players];
  }

  /**
   * Finds a player whose name includes the given query string.
   * @param query Name substring to search for.
   * @returns {Player | undefined} The found player, or undefined if not found.
   */
  find(query: string): Player | undefined {
    return this.players.find((p) => p.name.includes(query));
  }

  /**
   * Returns all players whose names include the given query string.
   * @param query Name substring to search for.
   * @returns {Player[]} Array of matching players.
   */
  search(query: string): Player[] {
    return this.players.filter((p) => p.name.includes(query));
  }

  /**
   * Deletes a player by ID.
   * @param id Player ID.
   * @returns {boolean} True if deleted, false if not found.
   */
  delete(id: number): boolean {
    const idx = this.players.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.players.splice(idx, 1);
    savePlayers(this.players);
    return true;
  }
}

/**
 * Singleton instance of PlayerContext.
 */
export const playerContext = new PlayerContext();

/**
 * React Context for PlayerContext.
 */
export const PlayerContextReact = createContext<PlayerContext>(playerContext);

/**
 * React hook to use PlayerContext.
 */
export function usePlayerContext() {
  return useContext(PlayerContextReact);
}

/**
 * Provider component for PlayerContext.
 */
const PlayerProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => playerContext, []);
  return (
    <PlayerContextReact.Provider value={value}>
      {children}
    </PlayerContextReact.Provider>
  );
};

export default PlayerProvider;
