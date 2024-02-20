import { WebSocket } from 'ws';
import { ExtendWebSocket } from '../model/types';
import { randomUUID } from 'crypto';
import { handleRequest } from './request';

export const wss = new WebSocket.Server({port: 3000});

wss.on('connection', (ws: ExtendWebSocket) => {
  console.log('A client connected!');
  const id = randomUUID();
  ws.id = id;

  ws.on('message', (message: string) => {
    const request = JSON.parse(message);
    handleRequest(ws, request);
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});