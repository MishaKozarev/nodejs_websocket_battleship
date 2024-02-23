import { Game } from '../model/field.type';
import { ExtendWebSocket, Room, User, UserWinner } from '../model/user.type';

export const users: User[] = [];
export let rooms: Room[] = [];
export const userWinners: UserWinner[] = [];
export const connections: ExtendWebSocket[] = [];
export const currentGame: Game[] = [];

export const removeRoom = (id: string) => {
  rooms = rooms.filter(
    (room) => room.roomId !== id,
  );
};
