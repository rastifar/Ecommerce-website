import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api/api";
import { BASE_URL, PRODUCTS } from "../constants/apiConst";

const initialState = {
  status: null,
  products: [],
  error: "",
};

export const getProduts = createAsyncThunk(
  "products/getProducts",
  async (dispatch, getState) => {
    const response = await api.get(BASE_URL + PRODUCTS);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state,action) => {
     // state.products = [...action.payload];
     //return [...state,...action.payload]
    //return [...action.payload];
     // return action.payload;
     state.products = action.payload
      // console.log(state.products);
    },
  },
  extraReducers: {
    [getProduts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProduts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [getProduts.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { getProducts, setProducts } = productSlice.actions;
export default productSlice.reducer;
