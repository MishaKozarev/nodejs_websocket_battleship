import { ExtendWebSocket, RequestByUser } from '../model/types';
import { addUsersToRoom } from './addUserToRoom';
import { createRoom } from './createRoom';
import { registerUser } from './registerUser';
import { updateRoom } from './updateRoom';
import { updateWinners } from './updateWinner';

export function handleRequest(ws: ExtendWebSocket, request: RequestByUser) {
  switch (request.type) {
  case 'reg':
    registerUser(ws, request);
    updateRoom();
    updateWinners();
    break;
  case 'create_room':
    createRoom(ws);
    break;
  case 'add_user_to_room':
    addUsersToRoom(ws, request);
    break;
  }
}
