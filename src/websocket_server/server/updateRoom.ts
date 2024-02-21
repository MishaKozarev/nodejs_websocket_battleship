import { connections, roomUsers } from '../db/db';

export const updateRoom = (): void => {
  const creatorRoom = roomUsers.filter((creator) => creator.roomUsers.length === 1);
  const roomAfterUpdate = JSON.stringify(creatorRoom);

  if (creatorRoom.length) {
      const response = {
      type: 'update_room',
      data: roomAfterUpdate,
      id: 0,
    };
    connections.forEach((ws) => {
      ws.send(JSON.stringify(response));
    });
  } else {
      const response = {
      type: 'update_room',
      data: '',
      id: -1,
    };
    connections.forEach((ws) => {
      ws.send(JSON.stringify(response));
    });
  }
};