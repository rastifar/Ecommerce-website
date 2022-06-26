import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
  productId:""
};

const tempDataSlice = createSlice({
  name: "tempData",
  initialState,
  reducers: {
    setTempData(state, action) {
      if (typeof action.payload === "number") {
        state.id = action.payload;       
        return
      }      
      state.data = action.payload;
    },
    deleteTempData(state) {
      state.data = ""     
    },
  },
});

export const { setTempData, deleteTempData } = tempDataSlice.actions;
export default tempDataSlice.reducer;
