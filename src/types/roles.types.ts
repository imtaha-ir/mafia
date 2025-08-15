export type RoleSide = 'MAFIA' | 'TOWN';
export interface Role  {
  id: number;
  name: string;
  side: RoleSide;
  description: string;
  longDescription?: string;
};
