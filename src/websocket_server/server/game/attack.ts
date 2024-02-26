import { Attack } from '../../model/game.type';
import { getCurrentGame } from './getCurrentGame';
import { getAttackingPlayer } from './getAttackingPlayer';
import { getAttack } from './getAttack';

export const attack = (attackData: Attack) => {
  const currentGame = getCurrentGame(attackData.gameId);

  const { sendAttackPlayer, getAttackPlayer } = getAttackingPlayer(
    currentGame,
    attackData.indexPlayer
  );

  if (sendAttackPlayer.turn) {
    const { x, y } = attackData;

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
