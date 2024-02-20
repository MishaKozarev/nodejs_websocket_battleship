import { users } from '../db/db';
import { ExtendWebSocket, RequestByUser, User } from '../model/types';
import { checkedUserExistence } from '../utils/isUserExist';

export function registerUser(ws: ExtendWebSocket, request: RequestByUser) {
  const { name, password } = JSON.parse(request.data);

  if (!checkedUserExistence(request)) {
    const newUser: User = {
      name,
      index: ws.id,
      password,
      wins: 0,
    };
    users.push(newUser);

    const response = {
      type: 'reg',
      data: JSON.stringify({
        name,
        index: users.indexOf(newUser),
        error: false,
        errorText: '',
      }),
      id: 0,
    };

    ws.send(JSON.stringify(response));
  }
}