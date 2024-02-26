import { MAX_CELLS_STEP } from '../../constants/field';
import { NeighboringCell, CellCoordinates, GameField } from '../../model/field.type';
import { ShipType } from '../../model/ships.type';
import { ExtendWebSocket } from '../../model/user.type';
import { getCellAround } from './getCellAround';
import { getNeighboringCells } from './getNeighboringCells';

export const getCellsKilledShip = (
  field: GameField,
  cellCoords: CellCoordinates,
  shipType: ShipType,
  currentPlayerId: number,
  ...connections: ExtendWebSocket[]
) => {
  const neighborsCellData: NeighboringCell[] = [];
  const neighborsCells = getNeighboringCells(field, cellCoords, '', true);

  if (shipType === 'small') {
    neighborsCellData.push(...getCellAround([cellCoords], field, cellCoords));
  } else {
    const { x, y } = cellCoords;
    const markedCells: NeighboringCell[] = [{ status: field[y][x], x, y }];

    const neighborsMarkedCells = neighborsCells.filter(
      (cell) => cell.status === 'killed'
    );
    markedCells.push(...neighborsMarkedCells);

    if (shipType === 'large' || shipType === 'huge') {
      if (neighborsMarkedCells.length < MAX_CELLS_STEP) {
        const neighborsMarkedCell = neighborsMarkedCells[0];
        const { x, y } = neighborsMarkedCell;

        const neighborsMarkedCellsForCell = getNeighboringCells(
          field,
          { x, y },
          'killed'
        );

        const indexOfCurrentCell = neighborsMarkedCellsForCell.findIndex(
          (cell) => cell.x === cellCoords.x && cell.y === cellCoords.y
        );

        neighborsMarkedCellsForCell.splice(indexOfCurrentCell, 1);

        markedCells.push(...neighborsMarkedCellsForCell);

        if (shipType === 'huge') {
          const { x, y } = neighborsMarkedCellsForCell[0];

          const cellsWithLastKilledCell = getNeighboringCells(
            field,
            { x, y },
            'killed'
          );

          const indexOfCurrentCell = cellsWithLastKilledCell.findIndex(
            (cell) =>
              cell.x === neighborsMarkedCell.x && cell.y === neighborsMarkedCell.y
          );

          cellsWithLastKilledCell.splice(indexOfCurrentCell, 1);
          markedCells.push(...cellsWithLastKilledCell);
        }
      } else {
        if (shipType === 'huge') {
          const cellWithLastKilledCell = neighborsMarkedCells.filter((cell) =>
          getNeighboringCells(field, { x: cell.x, y: cell.y }, 'killed')
          );

          const indexOfCurrentCell = cellWithLastKilledCell.findIndex(
            (cell) => cell.x === cellCoords.x && cell.y === cellCoords.y
          );

          cellWithLastKilledCell.splice(indexOfCurrentCell, 1);
  
          markedCells.push(...cellWithLastKilledCell);
        }
      }
    }

    neighborsCellData.push(...getCellAround(markedCells, field, cellCoords));
  }

  neighborsCellData.forEach((cell) => {
    const responseData = {
      type: 'attack',
      data: JSON.stringify({
        position: {
          x: cell.x,
          y: cell.y,
        },
        currentPlayer: currentPlayerId,
        status: cell.status,
      }),
      id: 0,
    };

    connections.forEach((connection) => {
      connection.send(JSON.stringify(responseData));
    });
  });
};
