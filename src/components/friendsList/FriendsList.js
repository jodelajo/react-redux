import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchFriends } from "../../features/friendsList";
import "./FriendsList.css";

function FriendsList() {
  const dispatch = useDispatch();
  const { status, error, friends } = useSelector(
    (state) => state.friendsList.value
  );
  console.log("friendslist", friends);

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
        {friends.map((friend) => {
          return (
            <ul key={friend.id} className="">
              <li className="friendslist">
                <h3>{friend.name}</h3>
                <p className="username">{friend.username}</p>
                <div className="change">
                  <input type="text" placeholder={`Change username`} />
                  <button className="update">Update</button>
                </div>
                <div className="change">
                  <p className="hate">NOT A FRIEND OF MINE 😡 </p>
                  <button className="destroy">Destroy⚡</button>
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
