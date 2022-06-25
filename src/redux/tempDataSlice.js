import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
};

const tempDataSlice = createSlice({
  name: "tempData",
  initialState,
  reducers: {
    setTempData(state, action) {
      state.data = action.payload;
    },
    deleteTempData(state) {
      state.data = ""     
    },
  },
});

export const { setTempData, deleteTempData } = tempDataSlice.actions;
export default tempDataSlice.reducer;
