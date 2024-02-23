export interface RequestAboutAddedShips {
  type: string;
  data: string;
  id: number;
}

export interface DataAboutAddedShips {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
}

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
}

interface Position {
  x: number;
  y: number;
}

export type ShipType = 'small' | 'medium' | 'large' | 'huge';


