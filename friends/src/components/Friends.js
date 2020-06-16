import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialValues = {
  friends: [],
};

const Friends = () => {
  const [friends, setFriends] = useState(initialValues);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    console.log("inside getdata -> friends", friends);
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log("getData -> res", res);
        setFriends({
          friends: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {friends.friends.length ? (
        <div>
          {friends.friends.map((friend) => (
            <div key={friend.id}>
              <p>{friend.name}</p>
              <p>{friend.age}</p>
              <p>{friend.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no friends</p>
      )}
    </div>
  );
};

export default Friends;
