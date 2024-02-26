import { rooms } from '../../db/db';
import { ExtendWebSocket } from '../../model/user.type';
import { getRandomId } from '../../utils/getRandomId';
import { getUserById } from '../user/getUserById';

export function createRoom(ws: ExtendWebSocket) {
  const roomId = getRandomId();
  const user = getUserById(ws.id);

  rooms.push({ roomId, playerNames: [user.name] });
}