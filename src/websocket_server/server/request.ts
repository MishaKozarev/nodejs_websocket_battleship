import { ExtendWebSocket, IndexRoom, UserRegister, RequestByUser } from '../model/user.type';
import { startGame } from './game/startGame';
import { addUsersToRoom } from './room/addUserToRoom';
import { createRoom } from './room/createRoom';
import { registerUser } from './user/registerUser';
import { updateRoom } from './room/updateRoom';
import { updateWinners } from './user/updateWinner';
import { AddShips } from '../model/ships.type';
import { createGame } from './room/createGame';
import { attack } from './game/attack';
import { Attack, RandomAttack } from '../model/game.type';
import { randomAttack } from './game/randomAttack';

export function handleRequest(ws: ExtendWebSocket, request: RequestByUser) {
  try {
    switch (request.type) {
      case 'reg':
        registerUser(ws, JSON.parse(request.data as string) as UserRegister);
        updateRoom();
        updateWinners();
        break;
      case 'create_room':
        createRoom(ws);
        updateRoom();
        break;
      case 'add_user_to_room':
        addUsersToRoom(ws, JSON.parse(request.data as string) as IndexRoom);
        updateRoom();
        createGame(JSON.parse(request.data as string) as IndexRoom);
        break;
      case 'add_ships':
        startGame(ws, JSON.parse(request.data as string) as AddShips);
        break;
      case 'attack':
        attack(JSON.parse(request.data as string) as Attack);
      case 'randomAttack':
        randomAttack(JSON.parse(request.data as string) as RandomAttack);
        break;
      }
  } catch(error) {
    console.log(`Error occurred: ${error}`);
  }
}

