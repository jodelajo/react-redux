import { configureStore } from "@reduxjs/toolkit";
import friendsListReducer from "../features/friendsList";

export const store = configureStore({
  reducer: {
    friendsList: friendsListReducer,
  },
});
