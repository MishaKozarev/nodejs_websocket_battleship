import { User } from '../model/types';

const users: User[] = [];

export function checkedUserExistence(name: string) {
  return users.some((user) => user.name === name);
}

export function registerUser(name: string, password?: string) {
  if (checkedUserExistence(name)) {
    return { index: -1, error: true, errorText: 'Player already exists' };
  }

  const newUser: User = {
    name,
    password,
    wins: 0,
  };

  users.push(newUser);

  return {
    index: users.length,
    error: false,
    errorText: '',
  };
}