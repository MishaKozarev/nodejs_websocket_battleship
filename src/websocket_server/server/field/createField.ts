import { Field } from '../../model/field.type';
import { Ship } from '../../model/ships.type';

export function createField(ships: Ship[]): Field {
  const fieldSize = 10;
  const field: Field = Array.from({ length: fieldSize }, () =>
    Array(fieldSize).fill('empty'),
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