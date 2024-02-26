import { users } from '../../db/db';
import { User } from '../../model/user.type';

export const getUserByName = (name: string): User => users.find((user) => user.name === name) as User;
