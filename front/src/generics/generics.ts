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

export interface ErrorType<T = undefined> {
  type: RequestErrorType,
  message: string;
  data?: T;
}

export type ValidationErrorItem = string[] | ErrorType | undefined;

export interface ResponseError {
  [key: string]: ValidationErrorItem | ValidationErrorItem[]
}

export interface PaginatedResults<T> {
  count: number;
  results: T[];
}

export type OmitNever<T> = Omit<T,
  { [K in keyof T]-?:
    Pick<T, K> extends Partial<Record<K, undefined>> ? K : never
  }[keyof T]
>;

export type RecursivePick<T extends object, K extends PropertyKey> = OmitNever<{
  [P in keyof T]: P extends K ? T[P] : (
    T[P] extends infer O ? O extends object ? RecursivePick<O, K> : never : never
  )
}> extends infer O ? { [P in keyof O]: O[P] } : never
