import { WebSocket } from 'ws'
import { userWinners } from "../db/db";

export const updateWinners = (ws: WebSocket) => {
  const response = {
    type: 'update_winners',
    data: JSON.stringify(userWinners),
    id: 0,
  };

  ws.send(JSON.stringify(response));
};