import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "itemCounter",
  initialState: {
    value: undefined,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    initiateState: (state) => {
      state.value = 0;
    },
  },
});


export const { increment, decrement, incrementByAmount, initiateState } =
  counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;