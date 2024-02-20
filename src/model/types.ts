export interface User {
  name: string;
  password: string;
  wins: number;
}

export interface RequestByUser {
  type: string;
  data: string;
  id: number
}