import { AxiosError } from 'axios';
import React from 'react';

export type GenericReactContent = React.ReactElement | React.ReactElement[];

export interface RejectResponse<ErrorData = void> {
  error?: AxiosError<ErrorData>;
  errorMessage: string;
}
