import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

abstract class StoreUtils {
    static createCustomAsyncThunk<Payload, Response>(
        prefix: string,
        options: {
        request: (payload: Payload) => Promise<AxiosResponse<Response>>,
        middleware?: <ChangedResponse>(data: Response) => ChangedResponse;
        successMessage: string,
        errorMessage: string},
    // eslint-disable-next-line @typescript-eslint/ban-types
    ): AsyncThunk<unknown, Payload, {}> {
        return createAsyncThunk(
            prefix,
            async (payload: Payload, { rejectWithValue }) => {
                const {
                    request, middleware, successMessage, errorMessage,
                } = options;

                try {
                    const response = await request(payload);
                    let { data } = response;

                    if (middleware) {
                        data = middleware(data);
                    }

                    return { data, successMessage };
                } catch (e) {
                    return rejectWithValue({ errorMessage });
                }
            },
        );
    }
}

export default StoreUtils;
