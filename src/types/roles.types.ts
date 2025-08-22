export type RoleSide = "MAFIA" | "TOWN";
export interface Role {
  id: number;
  charachterIndex?: number;
  name: string;
  side: RoleSide;
  min: number;
  max: number;
  description: string;
  longDescription?: string;
}
