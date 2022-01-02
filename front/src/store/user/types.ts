import { BaseState, ValidationErrorItem } from '@generics/generics';

export interface UserState extends BaseState {
  data: User | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  username: string;
  groups: Group;
  created: string;
}
export interface UserRegisterErrorResponse {
  [key: string]: ValidationErrorItem;
  email: ValidationErrorItem;
  username: ValidationErrorItem;
  password: ValidationErrorItem;
}

export interface LoginResponse {
  user: User;
}

export enum Group {
  ADMIN,
  REGULAR_USER,
}
