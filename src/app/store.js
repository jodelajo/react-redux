import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import themeReducer from "../features/theme";
import friendsListReducer from "../features/friendsList";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    friendsList: friendsListReducer,
  },
});
