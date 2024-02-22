import { ExtendWebSocket, Room, User, UserWinner } from '../model/types';

export const users: User[] = [];
export let rooms: Room[] = [];
export const userWinners: UserWinner[] = [];
export const connections: ExtendWebSocket[] = [];

export const removeRoom = (id: string) => {
  rooms = rooms.filter(
    (room) => room.roomId !== id,
  );
};
