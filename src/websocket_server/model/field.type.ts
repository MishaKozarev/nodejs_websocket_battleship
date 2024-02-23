export interface Game {
  currentGameId: string;
  ships: Field;
  indexPlayer: string;
  turn: boolean;
}

export type Field = StatusAndTypeCells[][];


export type StatusAndTypeCells =
  | 'miss'
  | 'killed'
  | 'shot'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'empty';


