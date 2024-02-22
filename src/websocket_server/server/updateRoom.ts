import { connections, rooms } from '../db/db';

export const updateRoom = (): void => {
  const creatorRoom = rooms.filter((creator) => creator.roomUsers.length === 1);
  const roomAfterUpdate = JSON.stringify(creatorRoom);
  const response = {
    type: 'update_room',
    data: roomAfterUpdate,
    id: 0,
  };
  connections.forEach((ws) => {
    ws.send(JSON.stringify(response));
  });

};