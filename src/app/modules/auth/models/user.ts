enum Direction {
  user = 0,
  moderator = 1,
  admin= 2,
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
