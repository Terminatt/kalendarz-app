import { BaseDataState, BaseItem, ValidationErrorItem } from '@generics/generics';

export interface UserState<T extends BaseItem> extends BaseDataState<T> {
  loadingScreen: boolean;
  currentUser: T | null
}

export interface User extends BaseItem {
  firstName: string;
  lastName: string;
  email: string;
  created: string;
  username: string;
  groups: Group;
}
export interface UserRegisterErrorResponse {
  [key: string]: ValidationErrorItem;
  email: ValidationErrorItem;
  username: ValidationErrorItem;
  password: ValidationErrorItem;
}

export interface UserErrorResponse {
  [key: string]: ValidationErrorItem;
}

export enum Group {
  NONE,
  ADMIN,
  REGULAR_USER,
}
