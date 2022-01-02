import { RejectResponse } from '@generics/generics';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';

function isAxiosError<ErrorData>(err: AxiosError<ErrorData> | Error | unknown): err is AxiosError<ErrorData> {
    return !!(err as AxiosError).response;
}

export interface CustomAsyncThunkResponse<Data = void> {
  data: Data,
  successMessage?: string
}
export interface CustomThunkConfig<ErrorData> {
    rejectValue: RejectResponse<ErrorData>
}

export interface CustomAsyncThunkPayload<ErrorData, Payload, Data> {
    requestPayload?: Payload;
    onSuccess?: (data: Data) => void;
    onError?: (errorData: AxiosError<ErrorData>) => void;

}

abstract class StoreUtils {
    static createCustomAsyncThunk<ErrorData = void, Payload = void, Data = void>(
        prefix: string,
        options: {
          request: (payload?: Payload) => Promise<AxiosResponse<Data>>,
          successMessage?: string,
          errorMessage?: string
      },
    ): AsyncThunk<CustomAsyncThunkResponse<Data>, CustomAsyncThunkPayload<ErrorData, Payload, Data> | void, CustomThunkConfig<ErrorData>> {
        return createAsyncThunk<CustomAsyncThunkResponse<Data>, CustomAsyncThunkPayload<ErrorData, Payload, Data> | void, CustomThunkConfig<ErrorData>>(
            prefix,
            async (payload, { rejectWithValue }) => {
                const { request, successMessage, errorMessage } = options;
                try {
                    const response = await request(payload?.requestPayload);
                    const { data } = response;

                    if (payload?.onSuccess) {
                        payload.onSuccess(data);
                    }

                    return { data, successMessage };
                } catch (error) {
                    if (isAxiosError<ErrorData>(error)) {
                        if (payload?.onError) {
                            payload.onError(error);
                        }

                        return rejectWithValue({ error: error.response?.data, errorMessage });
                    }
                    return rejectWithValue({ errorMessage });
                }
            },
        );
    }
}

export default StoreUtils;
