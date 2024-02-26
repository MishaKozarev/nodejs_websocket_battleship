import { WebSocket } from 'ws';
import { ExtendWebSocket } from '../model/user.type';
import { handleRequest } from './request';
import { getRandomId } from '../utils/getRandomId';

export const wss = new WebSocket.Server({port: 3000});

wss.on('connection', (ws: ExtendWebSocket) => {
  const id = getRandomId();
  ws.id = id;
  console.log(`Connected client ID: ${ws.id}!`);

  ws.on('message', (message: string) => {
    const request = JSON.parse(message);
    handleRequest(ws, request);
  });

  ws.on('close', () => {
    console.log(`Disconnected client ID${ws.id}!`);
  });
});