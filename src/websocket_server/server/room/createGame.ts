import { connections, removeRoom, rooms } from '../../db/db';
import { ExtendWebSocket, IndexRoom, RequestByUser, Room, User } from '../../model/user.type';

export const createGame = (request: RequestByUser) => {
  const requestIndexRoom = JSON.parse(request.data) as IndexRoom;
  const currentRoom = rooms.find(
    (room) => room.roomId === requestIndexRoom.indexRoom,
  ) as Room;

  const userFirst = currentRoom.roomUsers.find(
    (user) => user.index === requestIndexRoom.indexRoom,
  ) as User;

  const userSecond = currentRoom.roomUsers.filter(
    (user) => user.index !== userFirst.index,
  )[0];

  const dataFirst = JSON.stringify({
    idGame: userFirst.index,
    idPlayer: userFirst.index,
  });

  const dataSecond = JSON.stringify({
    idGame: userFirst.index,
    idPlayer: userSecond.index,
  });

  const responseFirst = {
    type: 'create_game',
    data: dataFirst,
    id: 0,
  };

  const responseSecond = {
    type: 'create_game',
    data: dataSecond,
    id: 0,
  };

  const connectionFirst = connections.find(
    (item) => item.id === userFirst.index,
  ) as ExtendWebSocket;

  const connectionSecond = connections.find(
    (item) => item.id === userSecond.index,
  ) as ExtendWebSocket;

  connectionFirst.send(JSON.stringify(responseFirst));
  connectionSecond.send(JSON.stringify(responseSecond));

  removeRoom(currentRoom.roomId);
};