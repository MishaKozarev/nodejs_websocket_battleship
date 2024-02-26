import { UserGameInfo } from '../../model/game.type';
import { AddShips, PlayersShipsInfo, Ship } from '../../model/ships.type';
import { ExtendWebSocket } from '../../model/user.type';
import { getCurrentConnection } from '../../utils/getCurrentConnection';
import { getCurrentGame } from './getCurrentGame';
import { getTurn } from './getTurn';
import { createField } from '../field/createField';

export const startGame = (ws: ExtendWebSocket, data: AddShips) => {
  try {
    const playersShipsInfo: PlayersShipsInfo = {};
    const currentGame = getCurrentGame(data.gameId);

    const ships: Ship[] = data.ships;
    const field = createField(ships);

    const { playerFirst, playerSecond } = currentGame;

    if (playerFirst.wsId === ws.id) {
      playerFirst.field = field;
      playersShipsInfo.playerFirst = ships;
    } else {
      playerSecond.field = field;
      playersShipsInfo.playerSecond = ships;
    }

    if (playerFirst.field && playerSecond.field) {
      if (playerFirst.wsId !== ws.id) {
        const connectionFirst = getCurrentConnection(playerFirst.wsId);
        requestStartGame(connectionFirst, playerFirst, playersShipsInfo.playerFirst!);

        const connectionSecond = ws;
        requestStartGame(connectionSecond, playerSecond, playersShipsInfo.playerSecond!);

        getTurn(data.gameId, playerSecond.wsId, connectionFirst, connectionSecond);
      } else {
        const connection_1 = ws;
        requestStartGame(connection_1, playerFirst, playersShipsInfo.playerFirst!);

        const connection_2 = getCurrentConnection(playerSecond.wsId);
        requestStartGame(connection_2, playerSecond, playersShipsInfo.playerSecond!);

        getTurn(data.gameId, playerFirst.wsId, connection_1, connection_2);
      }
    }
  } catch(error) {
    console.log(error);
  }
};

const requestStartGame = (
  ws: ExtendWebSocket,
  playerInfo: UserGameInfo,
  playerShips: Ship[]
) => {
  const responseData = {
    type: 'start_game',
    data: JSON.stringify({
      ships: playerShips,
      currentPlayerIndex: playerInfo.wsId,
    }),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};
