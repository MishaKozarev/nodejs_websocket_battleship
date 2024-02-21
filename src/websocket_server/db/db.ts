import { ExtendWebSocket, IndexRoom, RequestByUser, Room, User, UserWinner } from '../model/types';
import { updateRoom } from '../server/updateRoom';

export let users: User[] = [];
export let roomUsers: Room[] = [];
export let userWinners: UserWinner[] = [];
export let connections: ExtendWebSocket[] = [];

export const addUsersToRoom = (ws: ExtendWebSocket, request: RequestByUser) => {
  const roomIndex = JSON.parse(request.data) as IndexRoom;
  const isUserTheCreateRoom = roomIndex.indexRoom === ws.id;

  if (isUserTheCreateRoom) return;

  const userToRoom = users.find(
    (user) => user.index === ws.id,
  ) as User;

  const roomToAddUser = roomUsers.find(
    (room) => room.roomId === roomIndex.indexRoom,
  ) as Room;

  if (roomUsers.find((room) => room.roomId === userToRoom.index)) {
    roomUsers = roomUsers.filter(
      (room) => room.roomId !== userToRoom.index,
    );
  }

  roomToAddUser.roomUsers.push(userToRoom);
  updateRoom();
}



