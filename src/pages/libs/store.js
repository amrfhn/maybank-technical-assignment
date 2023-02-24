import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./addressSlice";

const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
  },
});

export default store;
