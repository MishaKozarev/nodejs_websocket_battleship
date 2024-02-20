const roomUsers: Room[] = [];
const players: Player[] = [];

interface Player {
  name: string;
  password: string;
  index: string;
  wins: number;
}
interface CustomWebSocket extends WebSocket {
  index: string;
}
interface Room {
  roomId: string;
  roomUsers: RoomUsers[];
}

interface RoomUsers {
  name: string;
  index: string;
}

export function handleRoomCreation(ws: CustomWebSocket) {
  if (roomUsers.find((room) => room.roomId === ws.index)) return;

  const creator = players.find((player) => player.index === ws.index) as Player;

  const newRoom = {
    roomId: creator.index,
    roomUsers: [
      {
        name: creator.name,
        index: creator.index,
      },
    ],
  };

  roomUsers.push(newRoom);

  // updateRoom();
}