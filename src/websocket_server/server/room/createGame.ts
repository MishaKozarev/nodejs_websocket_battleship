import { connections, currentGames, removeUserFromRoom, rooms } from '../../db/db';
import { IndexRoom } from '../../model/user.type';
import { getUserByName } from '../user/getUserByName';

export const createGame = ({ indexRoom }: IndexRoom) => {
  const room = rooms.find((room) => room.roomId === indexRoom);

  if (!room || room.playerNames.length !== 2) {
    return;
  }

  const idGame = room.roomId;

  const userWsIds = room.playerNames.map((name) => {
    const user = getUserByName(name);
    return user.wsId;
  });

 connections.forEach((connection) => {
    if (userWsIds.includes(connection.id)) {
      const data = {
        idGame,
        idPlayer: connection.id,
      };

      const responseData = {
        type: 'create_game',
        data: JSON.stringify(data),
        id: 0,
      };

      connection.send(JSON.stringify(responseData));
    }
  });

  const game = {
    id: idGame,
    playerFirst: {
      wsId: userWsIds[0],
      turn: false,
    },
    playerSecond: {
      wsId: userWsIds[1],
      turn: false,
    },
  };

  currentGames.push(game);
  removeUserFromRoom(room.roomId);
};