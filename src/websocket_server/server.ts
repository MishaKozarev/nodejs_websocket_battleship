import { WebSocket } from 'ws';
import { registerUser } from '../db/db';
import { RequestByUser } from '../model/types';

export const wss = new WebSocket.Server({port: 3000});

wss.on('connection', (ws: WebSocket) => {
  console.log('A client connected!');

  ws.on('message', (message: string) => {
    const request = JSON.parse(message);
    handleRequest(ws, request);
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });

});

function handleRequest(ws: WebSocket, request: RequestByUser) {
  switch (request.type) {
  case 'reg':
    handleRegistration(ws, request);
  }
}

function handleRegistration(ws: WebSocket, request: RequestByUser) {
  const { name, password } = request.data;

  const { index, error, errorText } = registerUser(name, password);

  const response = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index,
      error,
      errorText,
    }),
    id: 0,
  };

  ws.send(JSON.stringify(response));
}