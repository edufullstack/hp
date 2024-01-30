export type AppContextOwn = {
  user: User;
  setUser: (user: User) => void;
};
export type User = {
  id?: string;
  name: string;
  email: string;
  token?: string;
  role?: string;
  password?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
};

export type Login = {
  name?: string;
};
