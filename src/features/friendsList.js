import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  status: "idle",
  error: null,
  friends: [],
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
    },
    friendDeleted: (state, action) => {
      state.value.status = "success";
      state.value.friends = state.value.friends.filter(
        (friend) => action.payload !== friend.id
      );
    },
    friendUpdated: (state, action) => {
      console.log(action.payload);
      state.value.status = "success";
      state.value.friends.map(
        (friend) =>
          friend.id === action.payload.id &&
          (friend.username = action.payload.username)
      );
    },
    friendAdded: (state, action) => {
      state.value.status = "success";
      state.value.friends.push(action.payload);
    },
  },
});

export const {
  friendsLoading,
  friendsFetched,
  friendsFetchedFailed,
  friendDeleted,
  friendUpdated,
  friendAdded,
} = friendsListSlice.actions;

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

export const deleteFriend = (id) => async (dispatch) => {
  console.log("delete ", id);
  dispatch(friendsLoading());
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log("in axios delete");
    dispatch(friendDeleted(id));
  } catch (error) {
    dispatch(friendsFetchedFailed(error.message));
  }
};
export const updateFriend =
  (friend, newFriendName, setNewFriendName) => async (dispatch) => {
    dispatch(friendsLoading());
    try {
      await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${friend.id}`,
        {
          body: { username: newFriendName },
        }
      );
      dispatch(friendUpdated({ username: newFriendName, id: friend.id }));
      setNewFriendName("");
    } catch (error) {
      dispatch(friendsFetchedFailed(error.message));
    }
  };

export const addFriend = (newFriend, setNewFriend) => async (dispatch) => {
  dispatch(friendsLoading());
  try {
    await axios.post(`https://jsonplaceholder.typicode.com/users/`, {
      body: newFriend,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    dispatch(friendAdded(newFriend));
    setNewFriend({});
  } catch (error) {
    dispatch(friendsFetchedFailed(error.message));
  }
};

export default friendsListSlice.reducer;
