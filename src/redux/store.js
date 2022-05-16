import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminSlice';

export const store = configureStore({
    devTools: true,
    preloadedState:loadPreloadState(),
    reducer: {
        admin: adminReducer,
       
    }
})


const loadPreloadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined;
    }
}
const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState)
    } catch {
        
    }
}

store.subscribe(() =>{ saveState({admin: store.getState().admin})})