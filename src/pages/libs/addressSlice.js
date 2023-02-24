import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: [],
  reducers: {
    addAddress: {
      reducer: (state, action) => {
        state.push(action.payload)
      }
    },
    saveAddress: (state, action) => action.payload,
  },
});

export default addressSlice;
