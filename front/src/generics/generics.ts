import React from 'react';

export type GenericReactContent = React.ReactElement | React.ReactElement[];

export interface BaseItem {
  id: number;
  created: string;
}

export interface BaseState {
  isLoading: boolean;
}

export interface BaseDataState<Data extends BaseItem> extends BaseState {
  data: Data[],
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
