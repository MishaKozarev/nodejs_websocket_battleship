import { DefinedAttackers, Game, UserGameInfo } from '../../model/game.type';

export const getAttackingPlayer = (game: Game, indexPlayer: number): DefinedAttackers => {
  let sendAttackPlayer: UserGameInfo;
  let getAttackPlayer: UserGameInfo;

  game.playerFirst.wsId === indexPlayer
  ? (function () {
      sendAttackPlayer = game.playerFirst;
      getAttackPlayer = game.playerSecond;
    })()
  : (function () {
      sendAttackPlayer = game.playerSecond;
      getAttackPlayer = game.playerFirst;
    })();

    return { sendAttackPlayer, getAttackPlayer };
};