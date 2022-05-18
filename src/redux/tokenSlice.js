import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    addToken: (state, action) => {
      return action.payload;
    },
    removeToken: () =>initialState,
  },
});

export const { addToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
