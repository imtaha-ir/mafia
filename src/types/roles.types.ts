export type RoleSide = "MAFIA" | "TOWN";
export interface RoleSetting {
  caption: string;
  min: number;
  max: number;
  default: number;
}
export interface Role {
  id: number;
  charachterIndex?: number;
  name: string;
  side: RoleSide;
  min: number;
  max: number;
  description: string;
  longDescription?: string;
  settings?: Record<string, RoleSetting>;
}
