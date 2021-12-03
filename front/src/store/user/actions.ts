import { createAction } from "@reduxjs/toolkit";

export const updateLoading = createAction<{loading: boolean}>('UPDATE_LOADING');