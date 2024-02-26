import { NeighboringCell, CellCoordinates, GameCell, GameField } from '../../model/field.type';
import { getNeighboringCells } from './getNeighboringCells';

export const updateField = (
  cellStatus: GameCell,
  field: GameField,
  { x, y }: CellCoordinates
): void => {
  if (cellStatus === 'killed') {
    if (field[y][x] !== 'small') {
      const shotCells = getNeighboringCells(field, { x, y }, 'shot');
      shotCells.forEach((cell) => (field[cell.y][cell.x] = 'killed'));

      if (field[y][x] === 'large') {
        const shotNeighboringCellsToCells: NeighboringCell[] = [];

        shotCells.forEach((cell) => {
          const neighbors = getNeighboringCells(
            field,
            { x: cell.x, y: cell.y },
            'shot'
          );

          shotNeighboringCellsToCells.push(...neighbors);
          neighbors.forEach((cell) => (field[cell.y][cell.x] = 'killed'));
        });

        if (field[y][x] === 'huge') {
          shotNeighboringCellsToCells.forEach((cell) => {
            const neighbors = getNeighboringCells(
              field,
              { x: cell.x, y: cell.y },
              'shot'
            );
            neighbors.forEach((cell) => (field[cell.y][cell.x] = 'killed'));
          });
        }
      }
    }

    field[y][x] = 'killed';
  } else {
    field[y][x] = cellStatus;
  }
};
