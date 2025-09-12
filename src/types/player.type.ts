import type { Role } from "./roles.types";

export interface Player {
  id: number;
  name: string;
  dateOfBirth?: string;
  avatar?: any;
}

export type PlayerAbility =
  | "KILL"
  | "INVESTIGATE"
  | "PROTECT"
  | "BLOCK"
  | "SILENSE"
  | "CONVERT"
  | "SPEAK"
  | "VOTE";

export interface GamePlayer extends Player {
  role?: Role;
  alive?: boolean;
  onStage?: boolean;
  challengesLeft?: number;
  abilities: PlayerAbility[];
  roleSettings: { [key: string]: number };
}
