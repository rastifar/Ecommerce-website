import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import tokenReducer from "./tokenSlice";

const loadPreloadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
const saveState = (token) => {
  try {
    const serializedState = JSON.stringify(token);
    localStorage.setItem("token", serializedState);
  } catch {}
};
export const store = configureStore({
  devTools: true,
  preloadedState: loadPreloadState(),
  reducer: {
    admin: adminReducer,
    token: tokenReducer,
  },
});

store.subscribe(() => {
    // saveState({ admin: store.getState().admin });
    saveState({ token: store.getState().token });
});
