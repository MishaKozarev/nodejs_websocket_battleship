import { randomUUID } from 'crypto';
import { roomUsers, users } from '../db/db';
import { ExtendWebSocket, Room, User } from '../model/types';
import { updateRoom } from './updateRoom';

export function createRoom(ws: ExtendWebSocket) {

  const roomId = randomUUID();

  const creatorRoom = users.find((user) => user.index === ws.id) as User;

  const newRoom: Room = {
    roomId,
    roomUsers: [
      {
        name: creatorRoom.name,
        index: creatorRoom.index,
      },
    ],
  };
  roomUsers.push(newRoom);
  updateRoom();
}