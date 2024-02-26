import { FIELD_SIZE } from '../../constants/field';
import { GameField } from '../../model/field.type';
import { Ship } from '../../model/ships.type';

export function createField(ships: Ship[]): GameField {
  const field: GameField = Array.from({ length: FIELD_SIZE }, () =>
    Array(FIELD_SIZE).fill('empty'),
  );

  for (const ship of ships) {
    const { x, y } = ship.position;
    const { direction, length } = ship;

    for (let i = 0; i < length; i += 1) {
      const cellX = direction ? x : x + i;
      const cellY = direction ? y + i : y;

      field[cellY][cellX] = ship.type;
    }
  }
  return field;
}