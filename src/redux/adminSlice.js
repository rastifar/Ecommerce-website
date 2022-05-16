import { createSlice } from '@reduxjs/toolkit';
import React, { useState } from 'react';


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        username: "",
        password:""
    },
    reducers: {
        addUser: (state,action) => {
            return action.payload
        }
    }
})

export const { addUser } = adminSlice.actions

export default adminSlice.reducer
