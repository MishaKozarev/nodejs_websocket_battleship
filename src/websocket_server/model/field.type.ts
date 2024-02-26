export type GameField = GameCell[][];

export type GameCell =
  | 'miss'
  | 'killed'
  | 'shot'
  | 'empty'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge';

export type NeighboringCell = {
  status: GameCell;
  x: number;
  y: number;
};

export type CellCoordinates = {
  x: number;
  y: number;
}