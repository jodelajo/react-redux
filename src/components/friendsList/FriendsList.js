import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchFriends,
  updateFriend,
  deleteFriend,
  addFriend,
} from "../../features/friendsList";
import "./FriendsList.css";

function FriendsList() {
  const dispatch = useDispatch();
  const { status, error, friends } = useSelector(
    (state) => state.friendsList.value
  );
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriend, setNewFriend] = useState({
    id: 0,
    name: "",
    username: "",
  });

  const onChangeHandlerName = (e) => {
    e.preventDefault();
    setNewFriend({
      // ...newFriend,
      name: e.target.value,
      id: friends.length + 1,
    });
  };

  const onChangeHandlerUsername = (e) => {
    e.preventDefault();
    setNewFriend({ ...newFriend, username: e.target.value });
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
      <div className="add-friend">
        <h3>Add new friend </h3>
        <input
          type="text"
          value={newFriend.name || ""}
          placeholder="Name..."
          onChange={onChangeHandlerName}
        />
        <input
          type="text"
          placeholder="Username..."
          value={newFriend.username || ""}
          onChange={onChangeHandlerUsername}
        />
        <button onClick={() => dispatch(addFriend(newFriend, setNewFriend))}>
          Add your friend
        </button>
      </div>

      <div className="friendsSector">
        {friends?.map((friend) => {
          return (
            <ul key={friend?.id} className="">
              <li className="friendslist">
                <h3>{friend?.name}</h3>
                <p className="username">{friend?.username}</p>
                <div className="change">
                  <input
                    type="text"
                    placeholder={`Change username`}
                    onChange={(e) => setNewFriendName(e.target.value)}
                  />
                  <button
                    className="update"
                    onClick={() =>
                      dispatch(
                        updateFriend(friend, newFriendName, setNewFriendName)
                      )
                    }
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
