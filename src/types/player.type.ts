import type { Role } from "./roles.types";

export interface Player {
  id: number;
  name: string;
  dateOfBirth?: string;
  avatar?: any;
}

export interface GamePlayer extends Player {
  role?: Role;
}
