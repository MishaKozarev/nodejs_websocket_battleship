import { users } from '../db/db';
import { RequestByUser, User } from '../model/types';

export function checkedUserExistence(request: RequestByUser) {
  const {name}: User = JSON.parse(request.data);
  return users.some((user) => user.name === name);
}