import { users } from '../db/db';

export function checkedUserExistence(name: string) {
  return Boolean(users.find((player) => player.name === name));
}