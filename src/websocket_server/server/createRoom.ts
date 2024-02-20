import { roomUsers, users } from '../db/db';
import { ExtendWebSocket, Room, User } from '../model/types';


export function createRoom(ws: ExtendWebSocket) {

  const currentUser = users.find(
    (user) => user.index === ws.id,
  ) as User;

  const newRoom: Room = {
    roomId: currentUser.index,
    roomUsers: [
      {
        name: currentUser.name,
        index: currentUser.index,
      },
    ],
  };
  roomUsers.push(newRoom);

  const dataRoom = JSON.stringify(roomUsers);

  const response = {
    type: 'create_room',
    data: dataRoom,
    id: 0
  };
  ws.send(JSON.stringify(response));
}