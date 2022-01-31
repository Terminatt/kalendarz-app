export type GenericReactContent = React.ReactElement | React.ReactElement[];
export type Id = number;

export interface SearchFilter {
  search: string;
}

export interface ListRequestPayload<T> {
  page?: number;
  filters?: Partial<T> & Partial<SearchFilter>;
}

export interface BaseItem {
  id: Id;
  name: string;
  created: string;
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
  errorMessage?: string;
}

export interface ValidationError {
  type: string,
  message: string;
}

export type ValidationErrorItem = string[] | ValidationError | undefined;

export interface ResponseError {
  [key: string]: ValidationErrorItem
}

export interface PaginatedResults<T> {
  count: number;
  results: T[];
}
