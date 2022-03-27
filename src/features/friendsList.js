import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

const initialStateValue = {
  status: "idle",
  error: null,
  friends: [],
  selectedFriend: {},
};

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
    selectFriend: (state, action) => {
      state.value.selectedFriend = action.payload;
    },
    friendDeleted: (state, action) => {
      console.log("deleting my friend");
      state.value.status = "success";
      state.value.friends = state.value.friends.filter(
        (friend) => action.payload !== friend.id
      );
    },
    // friendsUpdated: (state, action) => {
    //   const currentSelectedFriendState = current(
    //     state.value.selectedFriend.friend
    //   );
    //   const currentUsername = current(
    //     state.value.selectedFriend.friend.username
    //   );
    //   console.log("hoiiii", currentSelectedFriendState);
    //   console.log("currentUsername", currentSelectedFriendState.username);
    //   const { username, id } = action.payload;
    //   // const existingFriend = state.find(
    //   //   (selectedFriend) => selectedFriend.id === id
    //   // );
    //   // if (existingFriend) {
    //   //   console.log("existing friend", existingFriend);
    //   // }
    //   // console.log("existing friend", existingFriend);
    //   console.log("username", username);
    //   console.log("id", id);
    //   if (username) {
    //     return {
    //       currentSelectedFriendState: {
    //         username: username,
    //       },
    //     };
    //   }
    // },
  },
});

export const {
  friendsLoading,
  friendsFetched,
  friendsFetchedFailed,
  selectFriend,
  friendDeleted,
  // friendsUpdated,
} = friendsListSlice.actions;

export const fetchFriends = () => async (dispatch) => {
  // const friendId = getState();
  // console.log("friendid", friendId);

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

export const deleteFriend = (id) => async (dispatch) => {
  console.log("delete ", id);
  dispatch(friendsLoading());
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log("in axios delete");
    dispatch(friendDeleted(id));
    // dispatch(friendsFetched(response.data));
  } catch (error) {
    dispatch(friendsFetchedFailed(error.message));
  }
};

export default friendsListSlice.reducer;
