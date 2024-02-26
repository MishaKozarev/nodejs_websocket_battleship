import { CellCoordinates } from '../../model/field.type';
import { DefinedAttackers } from '../../model/game.type';
import { getCellStatus } from '../field/getCellStatus';
import { updateField } from '../field/updateField';
import { checkIsGameEnd } from './checkIsGameEnd';
import { getCurrentConnection } from '../../utils/getCurrentConnection';
import { getCellsKilledShip } from '../field/getCellsKilledShip';
import { ShipType } from '../../model/ships.type';
import { userWinners } from '../../db/db';
import { updateWinners } from '../user/updateWinner';
import { getTurn } from './getTurn';
import { getUserById } from '../user/getUserById';


type Params = {
  gameId: number;
  coords: CellCoordinates;
  players: DefinedAttackers;
};

export const getAttack = ({ gameId, coords, players }: Params) => {
  const { x, y } = coords;
  const { sendAttackPlayer, getAttackPlayer } = players;

  const shottingCell = getAttackPlayer.field![y][x];

  const cellStatus = getCellStatus(shottingCell, getAttackPlayer.field!, {
    x,
    y,
  });

  updateField(cellStatus, getAttackPlayer.field!, { x, y });

  const isGameEnd = checkIsGameEnd(getAttackPlayer.field!);

  const type = isGameEnd ? 'finish' : 'attack';
  const data = isGameEnd
    ? {
        winPlayer: sendAttackPlayer.wsId,
      }
    : {
        position: {
          x,
          y,
        },
        currentPlayer: sendAttackPlayer.wsId,
        status: cellStatus,
      };

  const responseData = {
    type,
    data: JSON.stringify(data),
    id: 0,
  };

  const connectionFirst = getCurrentConnection(sendAttackPlayer.wsId);
  const connectionSecond = getCurrentConnection(getAttackPlayer.wsId);

  connectionFirst.send(JSON.stringify(responseData));
  connectionSecond.send(JSON.stringify(responseData));

  if (cellStatus === 'killed') {
    getCellsKilledShip(
      getAttackPlayer.field!,
      { x, y },
      shottingCell as ShipType,
      sendAttackPlayer.wsId,
      connectionFirst,
      connectionSecond
    );
  }

  if (isGameEnd) {
    const winner = userWinners.find(
      (winner) => winner.wsId === sendAttackPlayer.wsId
    );
    if (winner) {
      winner.wins += 1;
    } else {
      const winner = getUserById(sendAttackPlayer.wsId);
      winner.wins += 1;

      userWinners.push({ wsId: winner.wsId, name: winner.name, wins: winner.wins });
    }

    updateWinners();

  } else {
    if (cellStatus === 'killed' || cellStatus === 'shot') {
      getTurn(gameId, sendAttackPlayer.wsId, connectionFirst, connectionSecond);
    } else {
      getTurn(gameId, getAttackPlayer.wsId, connectionFirst, connectionSecond);
    }
  }
};
