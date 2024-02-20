import { ExtendWebSocket, RequestByUser } from '../model/types';
import { createRoom } from './createRoom';
import { registerUser } from './registerUser';

export function handleRequest(ws: ExtendWebSocket, request: RequestByUser) {
  switch (request.type) {
  case 'reg':
    registerUser(ws, request);
    break;
  case 'create_room':
    createRoom(ws);
    break;
  }
}