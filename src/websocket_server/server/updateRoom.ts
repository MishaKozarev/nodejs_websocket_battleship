import WebSocket from 'ws';
import { roomUsers } from '../db/db';

export const updateRoom = (ws: WebSocket) => {
  const creatorRoom = roomUsers.filter((room) => room.roomUsers.length === 1);

  const update = JSON.stringify(creatorRoom);

  const response = {
    type: 'update_room',
    data: update,
    id: 0,
  };

  ws.send(JSON.stringify(response));
};