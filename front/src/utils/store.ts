/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestErrorType } from '@constants/constants';
import { BaseState, RejectResponse } from '@generics/generics';
import {
    ActionReducerMapBuilder,
    AsyncThunk, createAsyncThunk, createSlice, CreateSliceOptions, PayloadAction, Slice, SliceCaseReducers,
} from '@reduxjs/toolkit';
import { FulfilledActionFromAsyncThunk, PendingActionFromAsyncThunk, RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { notification } from 'antd';
import { AxiosResponse, AxiosError } from 'axios';
import { isAxiosError, isRequestErrorType } from './requests';

export interface CustomAsyncThunkResponse<Data = void> {
  data: Data;
  successMessage?: string;
}
export interface CustomThunkConfig<ErrorData> {
    rejectValue: RejectResponse<ErrorData>
}

export interface CustomAsyncThunkPayload<ErrorData, Payload, Data> {
    requestPayload?: Payload;
    onSuccess?: (data: Data) => void;
    onError?: (errorData: AxiosError<ErrorData>) => void;
}

export function createCustomAsyncThunk<ErrorData = void, Payload = void, Data = void>(
    prefix: string,
    options: {
      request: (payload: Payload extends undefined ? undefined : Payload) => Promise<AxiosResponse<Data>>;
      successMessage?: string;
      errorMessage?: string;
      blockErrorMsg?: RequestErrorType | RequestErrorType[];
  },
): AsyncThunk<CustomAsyncThunkResponse<Data>, CustomAsyncThunkPayload<ErrorData, Payload, Data> | void, CustomThunkConfig<ErrorData>> {
    return createAsyncThunk<CustomAsyncThunkResponse<Data>, CustomAsyncThunkPayload<ErrorData, Payload, Data> | void, CustomThunkConfig<ErrorData>>(
        prefix,
        async (_payload, { rejectWithValue }) => {
            const {
                request, successMessage, errorMessage, blockErrorMsg,
            } = options;
            const payload = _payload || {};
            try {
                const response = await request(payload.requestPayload as Payload extends undefined ? undefined : Payload);
                const { data } = response;

                if (payload.onSuccess) {
                    payload.onSuccess(data);
                }

                return { data, successMessage };
            } catch (error) {
                if (isAxiosError<ErrorData>(error)) {
                    let showMsg = true;
                    if (payload.onError) {
                        payload.onError(error);
                    }

                    if (!!blockErrorMsg && isRequestErrorType(error)) {
                        if (Array.isArray(blockErrorMsg)) {
                            showMsg = blockErrorMsg.includes(error.response.data.type);
                        } else {
                            showMsg = blockErrorMsg === error.response.data.type;
                        }
                    }

                    return rejectWithValue({ error: error.response?.data, errorMessage: showMsg ? errorMessage : null });
                }
                return rejectWithValue({ errorMessage });
            }
        },
    );
}

export interface DefaultMatchers {
    pending: (action: any) => action is PendingActionFromAsyncThunk<any>;
    fulfilled: (action: any) => action is FulfilledActionFromAsyncThunk<any>;
    rejected: (action: any) => action is RejectedActionFromAsyncThunk<any>;
}

export function createCustomSlice<Name extends string, State extends BaseState, CaseReducers extends SliceCaseReducers<State>>(
    options: Omit<CreateSliceOptions<State, CaseReducers, Name>, 'extraReducers'>,
    defaultMatchers: DefaultMatchers,
    buildExtraReducers?: (builder: ActionReducerMapBuilder<NoInfer<State>>) => void,
): Slice<State, CaseReducers, Name> {
    const { pending, fulfilled, rejected } = defaultMatchers;
    return createSlice({
        ...options,
        extraReducers: (builder) => {
            if (buildExtraReducers) {
                buildExtraReducers(builder);
            }

            builder
                .addMatcher(pending, (state) => {
                    state.isLoading = true;
                })
                .addMatcher(fulfilled, (state, success: PayloadAction<CustomAsyncThunkResponse>) => {
                    state.isLoading = false;
                    if (!success.payload.successMessage) {
                        return;
                    }

                    notification.success({ message: success.payload.successMessage });
                })
                .addMatcher(rejected, (state, error: PayloadAction<RejectResponse>) => {
                    state.isLoading = false;
                    if (!error.payload.errorMessage) {
                        return;
                    }

                    notification.error({ message: error.payload.errorMessage });
                });
        },
    });
}
