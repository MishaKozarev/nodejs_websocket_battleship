import { connections, users } from '../../db/db';
import { ExtendWebSocket, User, UserData } from '../../model/user.type';
import { checkedUserExistence } from '../../utils/isUserExist';

export function registerUser(ws: ExtendWebSocket, { name, password }: UserData): void {

  if (!checkedUserExistence(name)) {
    const newUser: User = {
      name,
      wsId: ws.id,
      password,
      wins: 0,
    };
    users.push(newUser);

    connections.push(ws);

    const response = {
      type: 'reg',
      data: JSON.stringify({
        name,
        index: ws.id,
        error: false,
        errorText: '',
      }),
      id: 0,
    };
    ws.send(JSON.stringify(response));
  }
}