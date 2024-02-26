import { CellCoordinates } from '../../model/field.type';
import { RandomAttack } from '../../model/game.type';
import { getCurrentGame } from './getCurrentGame';
import { createFieldCoordinates } from '../field/createFieldCoordinates';
import { getAttackingPlayer } from './getAttackingPlayer';
import { getAttack } from './getAttack';

export const randomAttack = (attackData: RandomAttack) => {
  const currentGame = getCurrentGame(attackData.gameId);

  const { sendAttackPlayer, getAttackPlayer } = getAttackingPlayer(
    currentGame,
    attackData.indexPlayer
  );

  if (sendAttackPlayer.turn) {
    const { x, y } = createFieldCoordinates(getAttackPlayer.field!) as CellCoordinates;

    const args = {
      gameId: attackData.gameId,
      coords: { x, y },
      players: {
        sendAttackPlayer,
        getAttackPlayer
      }
    };

    getAttack(args);
  }
};
