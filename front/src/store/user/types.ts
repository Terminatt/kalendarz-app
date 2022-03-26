import {
    BaseDataState, BaseItem, Id, ValidationErrorItem,
} from '@generics/generics';

export interface UserState<T extends BaseItem> extends BaseDataState<T> {
  loadingScreen: boolean;
  currentUser: T | null
}

export interface BaseUser extends BaseItem {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  groups: Group;
  permaBanned?: boolean;
  bannedTill?: string | null;
}

export interface BaseUserUpdatePayload extends Partial<BaseItem> {
  id: Id;
}
export interface User extends BaseUser {
  created: string;
}

export interface UserErrorResponse {
  [key: string]: ValidationErrorItem;
  email: ValidationErrorItem;
  username: ValidationErrorItem;
  password: ValidationErrorItem;
}

export interface LoginErrorResponse {
  bannedTill: string;
}

export enum Group {
  NONE,
  ADMIN,
  REGULAR_USER,
}
