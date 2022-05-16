import { createSlice } from '@reduxjs/toolkit';



export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        username: "",
        password:""
    },
    reducers: {
        adminloggedIn: (state,action) => {
            return action.payload
        }
    }
})

export const { adminloggedIn } = adminSlice.actions

export default adminSlice.reducer
