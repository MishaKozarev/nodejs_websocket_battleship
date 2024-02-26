import { markedCells } from '../../constants/game';
import { CellCoordinates, GameField } from '../../model/field.type';

export const createFieldCoordinates = (field: GameField): CellCoordinates => {

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  if (!markedCells.includes(field[y]?.[x])) {
    return { x, y };
  }
  return createFieldCoordinates(field);
};
