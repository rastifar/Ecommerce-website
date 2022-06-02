import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   modalMode : false
};
  
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeState(state) {
            console.log(state.modalMode);
            state.modalMode = !state.modalMode;
        }
    }
})

export const {
    changeState,
  } = modalSlice.actions;
  
  export default modalSlice.reducer;