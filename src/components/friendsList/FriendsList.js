import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchFriends,
  selectFriend,
  friendsLoading,
  friendsFetched,
  friendsFetchedFailed,
  friendUpdated,
  deleteFriend,
} from "../../features/friendsList";
import "./FriendsList.css";

function FriendsList() {
  const dispatch = useDispatch();
  const { status, error, friends } = useSelector(
    (state) => state.friendsList.value
  );
  const [newUserName, setNewUserName] = useState("");
  // console.log("friendslist", friends);
  console.log("new username", newUserName);

  // const onChangeHandler = (e) => {
  //   setNewUserName(e.target.value);
  // };

  const updateFriend = (friend) => async (dispatch) => {
    console.log("update username", friend.username);
    console.log("update id", friend.id);

    dispatch(friendsLoading());
    // dispatch(selectFriend());
    try {
      await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${friend.id}`,
        {
          // method: "PATCH",
          body: { username: newUserName },
        }
      );
      dispatch(friendUpdated({ username: newUserName, id: friend.id }));
      setNewUserName("");
      console.log("hoi");
      // dispatch(friendsFetched(response.data));
    } catch (error) {
      dispatch(friendsFetchedFailed(error.message));
    }
  };

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className="friendWrapper">
      <div>
        <h1>My best friends</h1>
        FriendsList: {friends.length}{" "}
      </div>
      <div className="friendsSector">
        {friends?.map((friend) => {
          return (
            <ul key={friend.id} className="">
              <li
                className="friendslist"
                onClick={() => dispatch(selectFriend(friend))}
              >
                <h3>{friend.name}</h3>
                <p className="username">{friend.username}</p>
                <div className="change">
                  <input
                    type="text"
                    value={newUserName}
                    placeholder={`Change username`}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                  <button
                    className="update"
                    onClick={() => dispatch(updateFriend(friend))}
                  >
                    Update
                  </button>
                </div>
                <div className="change">
                  <p className="hate">NOT A FRIEND OF MINE 😡 </p>
                  <button
                    className="destroy"
                    onClick={() => dispatch(deleteFriend(friend.id))}
                  >
                    Destroy⚡
                  </button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>

      <div>{status === "loading" && <p>Loading ...</p>}</div>
      <div>{status === "failed" && <p>{error}</p>}</div>
    </div>
  );
}

export default FriendsList;
