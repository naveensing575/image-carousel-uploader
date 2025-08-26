import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./slices/uploadSlice";
import carouselReducer from "./slices/carouselSlice";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    carousel: carouselReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
