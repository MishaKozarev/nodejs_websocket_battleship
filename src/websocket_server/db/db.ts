import { ExtendWebSocket, Room, User, UserWinner } from '../model/types';

export const users: User[] = [];
export let roomUsers: Room[] = [];
export const userWinners: UserWinner[] = [];
export const connections: ExtendWebSocket[] = [];

export const removeRoomUser = (id: string) => {
  roomUsers = roomUsers.filter(
    (room) => room.roomId !== id,
  );
};
