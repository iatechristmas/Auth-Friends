import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormValues = {
  name: "",
  age: "",
  email: "",
};

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const getData = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log("getData -> res", res);
        setFriends(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/friends", formValues)
      .then((res) => {
        console.log("onSubmit -> res", res);
        setFormValues(initialFormValues);
        getData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter a Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter an Age"
            name="age"
            value={formValues.age}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter an Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <button>Add</button>
        </form>
      </div>
      {friends.length ? (
        <div>
          {friends.map((friend) => (
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
