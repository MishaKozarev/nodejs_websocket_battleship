import { WebSocket } from 'ws';

export interface User {
  index: string;
  name: string;
  password: string;
  wins: number;
}

export interface RequestByUser {
  type: string;
  data: string;
  id: number
}

export interface Room {
  roomId: string;
  roomUsers: RoomUsers[];
}

interface RoomUsers {
  name: string;
  index: string;
}

export interface ExtendWebSocket extends WebSocket {
  id: string;
}