import React from 'react';

export type GenericReactContent = React.ReactElement | React.ReactElement[];
export interface RejectedPayload {
  errorMessage: string;
}
export interface SuccessPayload {
  successMessage: string;
}
