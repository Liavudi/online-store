import { configureStore } from "@reduxjs/toolkit";
import itemCounterReducer from "./reducers/item-catalog-slice";

export default preloadedState => (configureStore({
  reducer: {
    counter: itemCounterReducer,
  },
  preloadedState,

}));
