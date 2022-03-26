import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = { status: "idle", error: null, friends: [] };

export const friendsListSlice = createSlice({
  name: "friendsList",
  initialState: { value: initialStateValue },

  reducers: {
    friendsLoading: (state) => {
      state.value.status = "loading";
    },
    friendsFetched: (state, action) => {
      state.value.friends = action.payload;
      state.value.status = "success";
    },
    friendsFetchedFailed: (state, action) => {
      state.value.status = "failed";
      state.value.error = action.payload;
      //   console.log("hanlde action here later");
    },
  },
});

export const { friendsLoading, friendsFetched, friendsFetchedFailed } =
  friendsListSlice.actions;

export const fetchFriends = () => async (dispatch) => {
  dispatch(friendsLoading());
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch(friendsFetched(response.data));
  } catch (error) {
    dispatch(friendsFetchedFailed(error.message));
  }
};

export default friendsListSlice.reducer;
