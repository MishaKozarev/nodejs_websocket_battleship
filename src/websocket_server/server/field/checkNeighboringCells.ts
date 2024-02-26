import { CELL_LENGTH, MAX_CELLS_STEP } from '../../constants/field';
import { AttackStatus } from '../../constants/game';
import { LARGE_SHIP_LENGTH, ShipsType } from '../../constants/ship';
import { NeighboringCell, CellCoordinates, GameCell, GameField } from '../../model/field.type';
import { getNeighboringCells } from './getNeighboringCells';

export const checkNeighboringCells = (
  cell: GameCell,
  field: GameField,
  { x, y }: CellCoordinates
): GameCell => {
  if (cell === ShipsType.medium) {
    if (getNeighboringCells(field, { x, y }, ShipsType.medium).length) {
      return AttackStatus.shot;
    }
    return AttackStatus.killed;
  } else if (cell === ShipsType.large) {
    if (getNeighboringCells(field, { x, y }, ShipsType.large).length) {
      return AttackStatus.shot;
    } else {
      const shotCells: NeighboringCell[] = getNeighboringCells(
        field,
        { x, y },
        AttackStatus.shot
      );

      if (shotCells.length === LARGE_SHIP_LENGTH - CELL_LENGTH) {
        return AttackStatus.killed;
      } else {
        const { x, y } = shotCells[0];

        const shotCellsForCell = getNeighboringCells(field, { x, y }, AttackStatus.shot);

        return shotCellsForCell.length ? AttackStatus.killed : AttackStatus.shot;
      }
    }
  } else {
    if (getNeighboringCells(field, { x, y }, ShipsType.huge).length) {
      return AttackStatus.shot;
    } else {
      const shotCells: NeighboringCell[] = getNeighboringCells(
        field,
        { x, y },
        AttackStatus.shot
      );

      if (shotCells.length === MAX_CELLS_STEP) {
        const shotCellsForCell = shotCells.filter(
          (cell) =>
          getNeighboringCells(field, { x: cell.x, y: cell.y }, AttackStatus.shot).length
        );

        return shotCellsForCell.length ? AttackStatus.killed : AttackStatus.shot;
      } else {
        const { x, y } = shotCells[0];
        const shotCellsForCell = getNeighboringCells(field, { x, y }, AttackStatus.shot);

        if (shotCellsForCell.length) {
          const { x, y } = shotCellsForCell[0];
          const shotCells = getNeighboringCells(field, { x, y }, AttackStatus.shot);

          return shotCells.length ? AttackStatus.killed : AttackStatus.shot;
        } else {
          return AttackStatus.shot;
        }
      }
    }
  }
};
