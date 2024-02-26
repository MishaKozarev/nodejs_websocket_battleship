import { WebSocket } from 'ws';
import { Attack, RandomAttack } from './game.type';
import { AddShips } from './ships.type';

export interface ExtendWebSocket extends WebSocket {
  id: number;
}
export interface User {
  wsId: number;
  name: string;
  password: string;
  wins: number;
}

export type UserData = {
  name: string;
  password: string;
};

export interface Room {
  roomId: number;
  playerNames: string[];
}

export interface RequestByUser {
  type: string;
  data: RequestData;
  id: 0;
}

export type RequestData =
  | UserRegister
  | CreateRoom
  | IndexRoom
  | AddShips
  | Attack
  | RandomAttack;

  export type CreateRoom = string;

  export type UserRegister = {
    name: string;
    password: string;
  };


export interface UsersInRoom {
  name: string;
  index: string;
}

export type IndexRoom = {
  indexRoom: number;
};

export type UserWinner = {
  wsId: number;
  name: string;
  wins: number;
}


