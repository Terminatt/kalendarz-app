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
export interface CustomThunkConfig {
    rejectValue: RejectResponse
  }

abstract class StoreUtils {
    static createCustomAsyncThunk<Payload, Response>(
        prefix: string,
        options: {
          request: (payload: Payload) => Promise<AxiosResponse<Response>>,
          successMessage: string,
          errorMessage: string
      },
    ): AsyncThunk<CustomAsyncThunkResponse<Response>, Payload, CustomThunkConfig> {
        return createAsyncThunk<CustomAsyncThunkResponse<Response>, Payload, CustomThunkConfig>(
            prefix,
            async (payload, { rejectWithValue }) => {
                const { request, successMessage, errorMessage } = options;

                try {
                    const response = await request(payload);
                    const { data } = response;

                    return { data, successMessage };
                } catch (error) {
                    if (isAxiosError(error)) {
                        return rejectWithValue({ error, errorMessage });
                    }
                    return rejectWithValue({ errorMessage });
                }
            },
        );
    }
}

export default StoreUtils;
