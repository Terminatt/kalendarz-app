import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCharacterMetadata = createAsyncThunk(
  'creator/getCharacterMetadata',
  async () => {
    const test = null;
    // const response = await axios.get<{ test: number }>(
    //   'https://reqres.in/api/users',
    // )
    return test;
  },
);
