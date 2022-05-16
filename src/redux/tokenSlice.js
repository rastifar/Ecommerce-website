import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    addToken: (state, action) => {
      return action.payload;
    },
      removeToken: (state) => {
        state.token="",
    },
  },
});

export const { addToken } = tokenSlice.actions;

export default tokenSlice.reducer;
