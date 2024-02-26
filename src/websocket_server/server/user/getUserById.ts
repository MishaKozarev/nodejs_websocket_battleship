import { users } from '../../db/db';
import { User } from '../../model/user.type';

export const getUserById = (id: number): User => users.find((user) => user.wsId === id) as User;
