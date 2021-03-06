import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,  
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });

        state.cartTotalQuantity++;
        state.cartTotalAmount += +action.payload.price;
      }
    },
    increase(state, action) {
      const indexI = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[indexI].quantity++;
      state.cartTotalAmount += +action.payload.price;
    },
    decrease(state, action) {
      const indexD = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[indexD].quantity--;
      state.cartTotalAmount -= Number(action.payload.price);
    },
    romeveItem(state, action) {
      const newcartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
     
      const removeItemQuantity = state.cartItems[index].quantity;
      const removeItemPrice = Number(action.payload.price);
      state.cartTotalAmount -= removeItemPrice * removeItemQuantity;
      state.cartItems = newcartItems;
      state.cartTotalQuantity--;
    },

    clearCart(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
     
    },
    checkout(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;    
    },
  },
});

export const {
  addToCart,
  increase,
  decrease,
  romeveItem,
  checkout,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
