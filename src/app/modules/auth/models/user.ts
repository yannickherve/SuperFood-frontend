enum Direction {
  user = 'user',
  moderator = 'moderator',
  admin= 'admin',
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  newsletter: boolean;
  phone: string;
  role: Direction;
  last_seen: string;
}

export let UserModel: User = {
  _id: null,
  name: null,
  email: null,
  password: null,
  age: null,
  newsletter: null,
  phone: null,
  role: null,
  last_seen: null,
};
