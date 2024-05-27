import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Signup = (props) => {
  const URL = "http://localhost:5000/api/users/signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const onButtonClick = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setErrorMsg("Please enter your first name");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setErrorMsg("Please enter your last name");
      return;
    }
    if ("" === email) {
      setErrorMsg("Please enter your email");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMsg("Please enter a valid email");
      return;
    }
    if ("" === password) {
      setErrorMsg("Please enter a password");
      return;
    }
    if (password.length < 7) {
      setErrorMsg("The password must be 8 characters or longer");
      return;
    } else {
      setUser({ firstName, lastName, email, password });
      // console.log(user);
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const res_data = await response.json();
        // console.log("res from server", res_data.user);

        if (response.ok) {
          storeTokenInLS(res_data.token);
          setUser({ username: "", email: "", phone: "", password: "" });
          navigate("/");
        } else {
          setErrorMsg(res_data.message);
        }
      } catch (error) {
        setErrorMsg(error);
        console.log("register ", error);
      }
    }
  };

  return (
    <div className={"container"}>
      <div className={"signup"}>
        <div>Signup</div>
      </div>
      <div className={"input_container"}>
        <div className="flex_row">
          <input
            value={firstName}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            className={"input1"}
          />
          <input
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            className={"input1"}
          />
        </div>
      </div>
      <div className={"input_container"}>
        <input
          value={email}
          placeholder="Enter email here"
          onChange={(e) => setEmail(e.target.value)}
          className={"input"}
        />
      </div>
      <div className={"input_container"}>
        <input
          value={password}
          placeholder="Enter password here"
          onChange={(e) => setPassword(e.target.value)}
          className={"input"}
        />
      </div>
      <label className="error">{errorMsg}</label>
      <div className={"input_container"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Register"}
        />
      </div>
    </div>
  );
};

export default Signup;
