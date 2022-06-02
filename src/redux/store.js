import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import tokenReducer from "./tokenSlice";
import productReducer from "./productsSlice"
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';



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
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {}
};
export const store = configureStore({
  devTools: true,
  preloadedState: loadPreloadState(),
  reducer: {
    admin: adminReducer,
    token: tokenReducer,
    products : productReducer,
    cart:cartReducer,
    modal:modalReducer
  },
});

store.subscribe(() => {
  saveState({ token: store.getState().token,cart: store.getState().cart });
    // saveState({ admin: store.getState().admin });
  //saveState({ token: store.getState().token });
  //saveState({ cart: store.getState().cart });
});

// store.dispatch(productsFetch());
//store.dispatch(getTotals());

// store.subscribe(throttle(() => {
//   saveState({
//     todos: store.getState().todos
//   });
// }, 1000));

