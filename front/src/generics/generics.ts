import { RequestErrorType } from '@constants/constants';

export type GenericReactContent = React.ReactElement | React.ReactElement[] | string | number;
export type Id = number;

export interface SearchFilter {
  search: string;
}

export interface ListRequestPayload<T> {
  page?: number | null;
  filters?: Partial<T> & Partial<SearchFilter> & {[key: string]: any};
}

export interface BaseItem {
  [key: string]: any
  id: Id;
}

export interface BaseState {
  isLoading: boolean;
}

export interface BaseDataState<Data extends BaseItem> extends BaseState {
  data: PaginatedResults<Data>,
}

export interface BaseFullDataState<Data extends BaseItem> extends BaseDataState<Data> {
  selected: Data | null;
}

export interface RejectResponse<ErrorData = void> {
  error?: ErrorData;
  errorMessage?: string | null;
}

export interface ErrorType {
  type: RequestErrorType,
  message: string;
}

export type ValidationErrorItem = string[] | ErrorType | undefined;

export interface ResponseError {
  [key: string]: ValidationErrorItem
}

export interface PaginatedResults<T> {
  count: number;
  results: T[];
}
