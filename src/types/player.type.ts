import type { Role } from "./roles.types";

export interface Player {
  id: number;
  name: string;
  dateOfBirth?: string;
  avatar?: any;
}

export type PlayerDayAbility = "KILL" | "SPEAK" | "VOTE";

export type PlayerNightAbility =
  | "KILL"
  | "INVESTIGATE"
  | "PROTECT"
  | "BLOCK"
  | "SILENSE"
  | "CONVERT";

export interface GamePlayer extends Player {
  role?: Role;
  alive?: boolean;
  onStage?: boolean;
  challengesLeft?: number;
  dayAbilities: PlayerDayAbility[];
  nightAbilities: PlayerNightAbility[];
  roleSettings: Record<string, number>;
}
