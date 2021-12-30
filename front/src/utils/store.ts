import { RejectResponse } from '@generics/generics';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';

function isAxiosError(err: AxiosError | Error | unknown): err is AxiosError {
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
    onError?: () => void;

}

abstract class StoreUtils {
    static createCustomAsyncThunk<ErrorData = void, Payload = void, Data = void>(
        prefix: string,
        options: {
          request: (payload?: Payload) => Promise<AxiosResponse<Data>>,
          successMessage: string,
          errorMessage: string
      },
    ): AsyncThunk<CustomAsyncThunkResponse<Data>, CustomAsyncThunkPayload<ErrorData, Payload, Data>, CustomThunkConfig<ErrorData>> {
        return createAsyncThunk<CustomAsyncThunkResponse<Data>, CustomAsyncThunkPayload<ErrorData, Payload, Data>, CustomThunkConfig<ErrorData>>(
            prefix,
            async (payload, { rejectWithValue }) => {
                const { request, successMessage, errorMessage } = options;
                const { onSuccess, onError, requestPayload } = payload;
                try {
                    const response = await request(requestPayload);
                    const { data } = response;

                    if (onSuccess) {
                        onSuccess(data);
                    }

                    return { data, successMessage };
                } catch (error) {
                    if (isAxiosError(error)) {
                        if (onError) {
                            onError();
                        }

                        return rejectWithValue({ error, errorMessage });
                    }
                    return rejectWithValue({ errorMessage });
                }
            },
        );
    }
}

export default StoreUtils;
