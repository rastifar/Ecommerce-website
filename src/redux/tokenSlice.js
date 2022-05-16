import { createSlice } from "@reduxjs/toolkit";

initialState = {token:""};

export const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        addToken: (state,action) => {
            return action.payload
        }
        
    }
})

export const { addToken } = tokenSlice.actions;

export default tokenSlice.reducer