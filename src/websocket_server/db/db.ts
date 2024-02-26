import { Game } from '../model/game.type';
import { ExtendWebSocket, Room, User, UserWinner } from '../model/user.type';

export const users: User[] = [];
export const rooms: Room[] = [];
export const userWinners: UserWinner[] = [];
export const connections: ExtendWebSocket[] = [];
export const currentGames: Game[] = [];

export const removeUserFromRoom = (id: number): void => {
  const deletingPosition = rooms.findIndex((room) => room.roomId === id);
  rooms.splice(deletingPosition, 1);
};

