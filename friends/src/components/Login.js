import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormValues = {
  credentials: {
    username: "",
    password: "",
  },
};

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const login = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post("api/login", formValues)
      .then((res) => {
        window.localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
