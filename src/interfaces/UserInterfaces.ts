export interface User {
  id?: number;
  name?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export interface IRequestCreateUser {
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface IRequestAuthUser {
  user: string;
  password: string;
}

export interface IRequestFindUser {
  id?: number;
}
