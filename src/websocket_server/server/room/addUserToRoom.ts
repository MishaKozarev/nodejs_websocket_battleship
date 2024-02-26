import { rooms, users } from '../../db/db';
import { ExtendWebSocket, IndexRoom } from '../../model/user.type';
import { getUserById } from '../user/getUserById';

export const addUsersToRoom = (ws: ExtendWebSocket, { indexRoom }: IndexRoom) => {

  const room = rooms.find((room) => room.roomId === indexRoom);

  if (!room || room.playerNames.length > 1) {
    return;
  }

  const user = users.find((player) =>
    room.playerNames.includes(player.name)
  );

  if (user?.wsId === ws.id) {
    return;
  }

  const newUser = getUserById(ws.id);
  room.playerNames.push(newUser.name);
};