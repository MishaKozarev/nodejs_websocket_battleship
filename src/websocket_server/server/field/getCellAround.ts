import { FIELD_SIZE } from '../../constants/field';
import { NeighboringCell, CellCoordinates, GameField } from '../../model/field.type';

export const getCellAround = (
  cells: CellCoordinates[],
  field: GameField,
  currentCell: CellCoordinates
): NeighboringCell[] => {
  const cellAround: NeighboringCell[] = [];

  cells.forEach(({ x, y }) => {
    for (let nx = -1; nx <= 1; nx++) {
      for (let ny = -1; ny <= 1; ny++) {
        const newX = x + nx;
        const newY = y + ny;

        if (newX >= 0 && newX < FIELD_SIZE && newY >= 0 && newY < FIELD_SIZE) {
          cellAround.push({
            status: field[newY][newX],
            x: newX,
            y: newY,
          });
        }
      }
    }
  });

  const requiredCells = cellAround.filter(
    (point, index, self) =>
      index === self.findIndex((cell) => cell.x === point.x && cell.y === point.y)
  );

  const indexOfCurrentCell = requiredCells.findIndex(
    (cell) => cell.x === currentCell.x && cell.y === currentCell.y
  );

  requiredCells.splice(indexOfCurrentCell, 1);

  return requiredCells;
};
