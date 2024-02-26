import { GameField } from '../../model/field.type';

export const checkIsGameEnd = (field: GameField): boolean => {
  const ships = ['small', 'medium', 'large', 'huge' ];

  return field.filter((rows) => rows.filter((cell) => ships.includes(cell)).length).length === 0;

};