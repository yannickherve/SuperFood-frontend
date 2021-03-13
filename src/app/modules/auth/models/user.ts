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
  address: string;
  phone: string;
  role: Direction;
  last_seen: string;
}
