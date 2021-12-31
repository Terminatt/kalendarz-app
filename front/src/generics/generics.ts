import React from 'react';

export type GenericReactContent = React.ReactElement | React.ReactElement[];

export interface RejectResponse<ErrorData = void> {
  error?: ErrorData;
  errorMessage: string;
}

export interface ValidationError {
  type: string,
  message: string;
}

export type ValidationErrorItem = string[] | ValidationError | undefined;

export interface ResponseError {
  [key: string]: ValidationErrorItem
}
