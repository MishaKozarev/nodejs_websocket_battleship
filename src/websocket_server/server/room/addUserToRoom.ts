import { removeRoom, rooms, users } from '../../db/db';
import { ExtendWebSocket, IndexRoom, RequestByUser, Room, User } from '../../model/user.type';
import { createGame } from './createGame';
import { updateRoom } from './updateRoom';

export const addUsersToRoom = (ws: ExtendWebSocket, request: RequestByUser) => {
  const roomIndex = JSON.parse(request.data) as IndexRoom;
  const isUserTheCreateRoom = roomIndex.indexRoom === ws.id;

  if (isUserTheCreateRoom) return;

  const userToRoom = users.find(
    (user) => user.index === ws.id,
  ) as User;

  const roomToAddUser = rooms.find(
    (room) => room.roomId === roomIndex.indexRoom,
  ) as Room;

  if (rooms.find((room) => room.roomId === userToRoom.index)) {
    removeRoom(userToRoom.index);

  }
  roomToAddUser.roomUsers.push(userToRoom);
  updateRoom();
  createGame(request);
};