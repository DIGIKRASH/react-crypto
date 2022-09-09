import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import coins from "./coins/slice";

export const store = configureStore({
  reducer: {
    coins,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
