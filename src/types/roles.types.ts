export type RoleSide = 'MAFIA' | 'TOWN';
export interface Role  {
  id: number;
  name: string;
  side: RoleSide;
  shortDescription: string;
  longDescription: string;
};
