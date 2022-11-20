import { configureStore } from "@reduxjs/toolkit";
import itemCounterReducer from "./item-catalog-slice";

export default configureStore({
  reducer: {
    counter: itemCounterReducer,
  },
});