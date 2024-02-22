import { rooms, users } from '../db/db';
import { ExtendWebSocket, Room, User } from '../model/types';
import { updateRoom } from './updateRoom';

export function createRoom(ws: ExtendWebSocket) {
  if (rooms.find((room) => room.roomId === ws.id)) return;

  const creatorRoom = users.find((user) => user.index === ws.id) as User;

  const newRoom: Room = {
    roomId: creatorRoom.index,
    roomUsers: [
      {
        name: creatorRoom.name,
        index: creatorRoom.index,
      },
    ],
  };
  rooms.push(newRoom);
  updateRoom();
}