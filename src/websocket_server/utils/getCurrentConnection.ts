import { connections } from '../db/db';
import { ExtendWebSocket } from '../model/user.type';

export const getCurrentConnection = (id: number):ExtendWebSocket => connections.find(
    (connection) => connection.id === id
  ) as ExtendWebSocket;