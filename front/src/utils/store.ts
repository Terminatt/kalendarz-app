import { RejectResponse } from '@generics/generics';
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';

function isAxiosError(err: AxiosError | Error | unknown): err is AxiosError {
    return !!(err as AxiosError).response;
}

export interface CustomAsyncThunkResponse<Data = void> {
  data: Data,
  successMessage?: string
}

abstract class StoreUtils {
    static createCustomAsyncThunk<Payload, Response>(
        prefix: string,
        options: {
          request: (payload: Payload) => Promise<AxiosResponse<Response>>,
          successMessage: string,
          errorMessage: string
      },
    ) {
        return createAsyncThunk<CustomAsyncThunkResponse<Response>, Payload, { rejectValue: RejectResponse }>(
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
