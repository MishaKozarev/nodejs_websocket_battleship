import { ExtendWebSocket, RequestByUser } from '../model/user.type';
import { addShips } from './field/addShips';
import { addUsersToRoom } from './room/addUserToRoom';
import { createRoom } from './room/createRoom';
import { registerUser } from './user/registerUser';
import { updateRoom } from './room/updateRoom';
import { updateWinners } from './user/updateWinner';

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
  case 'add_ships':
    addShips(request);
    break;
  }
}

