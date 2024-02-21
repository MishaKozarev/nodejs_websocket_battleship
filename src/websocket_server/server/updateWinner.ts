import { connections, userWinners } from "../db/db";

export const updateWinners = () => {
  const response = {
    type: 'update_winners',
    data: JSON.stringify(userWinners),
    id: 0,
  };

  connections.forEach((ws) => {
    ws.send(JSON.stringify(response));
  });
};