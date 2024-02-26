import { currentGames } from '../../db/db';
import { Game } from '../../model/game.type';

export const getCurrentGame = (id: number): Game => currentGames.find(
  (game) => game.id === id
) as Game;