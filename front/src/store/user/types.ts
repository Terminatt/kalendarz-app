export interface UserState {
  isLoading: boolean;
  errorResponse?: UserRegisterErrorResponse | null;
}

export interface UserRegisterErrorResponse {
  email?: string[];
  username?: string[];
  password?: string[];
}
