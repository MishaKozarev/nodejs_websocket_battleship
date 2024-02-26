import { ExtendWebSocket } from '../../model/user.type';
import { getCurrentGame } from './getCurrentGame';

export const getTurn = (
  gameId: number,
  walkingPlayerId: number,
  ...connections: ExtendWebSocket[]
) => {
  const currentGame = getCurrentGame(gameId);

  if (currentGame.playerFirst.wsId === walkingPlayerId) {
    currentGame.playerFirst.turn = true;
    currentGame.playerSecond.turn = false;
  } else {
    currentGame.playerFirst.turn = false;
    currentGame.playerSecond.turn = true;
  }

  const responseData = {
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: walkingPlayerId,
    }),
    id: 0,
  };

  connections.forEach((connection) =>
    connection.send(JSON.stringify(responseData))
  );
};
