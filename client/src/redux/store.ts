import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slice/noteSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
