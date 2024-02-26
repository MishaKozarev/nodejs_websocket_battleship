import { connections, rooms } from '../../db/db';
import { getUserByName } from '../user/getUserByName';

export const updateRoom = (): void => {
  const roomsWithOneUser = rooms.filter(
    (room) => room.playerNames.length === 1
  );

  let data;
  if (roomsWithOneUser.length) {
    data = roomsWithOneUser.map((room) => {
      const roomUsers = room.playerNames.map((name) => ({
        name,
        index: getUserByName(name).wsId,
      }));
      return {
        roomId: room.roomId,
        roomUsers,
      };
    });
  } else {
    data = {
      roomId: -1,
      roomUser: [],
    };
  }
  const responseData = {
    type: 'update_room',
    data: JSON.stringify(data),
    id: 0,
  };
  connections.forEach((connection) => connection.send(JSON.stringify(responseData)));
};