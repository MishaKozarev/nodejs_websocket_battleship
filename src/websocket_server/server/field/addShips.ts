import { currentGame } from '../../db/db';
import { Game } from '../../model/field.type';
import { DataAboutAddedShips, RequestAboutAddedShips, Ship } from '../../model/ships.type';
import { createField } from './createField';

export const addShips = (request: RequestAboutAddedShips) => {
  const shipsData = JSON.parse(request.data) as DataAboutAddedShips;

  const ships: Ship[] = shipsData.ships;

  const shipsOnField = createField(ships);

  const user: Game = {
    currentGameId: shipsData.gameId,
    ships: shipsOnField,
    indexPlayer: shipsData.indexPlayer,
    turn: false,
  };

  currentGame.push(user);
};