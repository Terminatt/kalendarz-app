import { BaseState, ValidationErrorItem } from '@generics/generics';

export interface UserState extends BaseState {
  loadingScreen: boolean;
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

export enum Group {
  NONE,
  ADMIN,
  REGULAR_USER,
}
