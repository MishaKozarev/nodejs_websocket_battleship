import { GameField, } from './field.type';

export type DefinedAttackers = {
  sendAttackPlayer: UserGameInfo;
  getAttackPlayer: UserGameInfo;
};

export type Game = {
  id: number;
  playerFirst: UserGameInfo;
  playerSecond: UserGameInfo;
};

export type UserGameInfo = {
  wsId: number;
  turn: boolean;
  field?: GameField;
};

export type Attack = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

export type RandomAttack = {
  gameId: number;
  indexPlayer: number;
};
