import { ValidationErrorItem } from '@generics/generics';

export interface UserState {
  isLoading: boolean;
}

export interface UserRegisterErrorResponse {
  [key: string]: ValidationErrorItem;
  email: ValidationErrorItem;
  username: ValidationErrorItem;
  password: ValidationErrorItem;
}
