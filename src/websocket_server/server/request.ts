import { ExtendWebSocket, RequestByUser } from '../model/types';
import { createRoom } from './createRoom';
import { registerUser } from './registerUser';
import { updateRoom } from './updateRoom';
import { updateWinners } from './updateWinner';

export function handleRequest(ws: ExtendWebSocket, request: RequestByUser) {
  switch (request.type) {
  case 'reg':
    registerUser(ws, request);
    updateRoom(ws);
    updateWinners(ws);
    break;
  case 'create_room':
    createRoom(ws);
    updateRoom(ws);
    break;
  }
}