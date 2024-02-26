import { NeighboringCell, CellCoordinates, GameField } from '../../model/field.type';

export const getNeighboringCells = (
  field: GameField,
  { x, y }: CellCoordinates,
  condition: string,
  noFilter?: boolean,
): NeighboringCell[] => {
  const rows = field.length;
  const columns = field[0].length;

  const neighboringCells: NeighboringCell[] = [];

  if (x > 0) {
    neighboringCells.push({ status: field[y][x - 1], x: x - 1, y });
  }

  if (x < columns - 1) {
    neighboringCells.push({ status: field[y][x + 1], x: x + 1, y });
  }

  if (y > 0) {
    neighboringCells.push({ status: field[y - 1][x], x, y: y - 1 });
  }

  if (y < rows - 1) {
    neighboringCells.push({ status: field[y + 1][x], x, y: y + 1 });
  }

  return noFilter
    ? neighboringCells
    : neighboringCells.filter((cell) => cell.status === condition);
};
