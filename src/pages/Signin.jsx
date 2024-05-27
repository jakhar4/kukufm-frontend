import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Signin = () => {
  const URL = "http://localhost:5000/api/users/signin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const onButtonClick = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    // check correction
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
    }
    // Authentication
    else {
      setUser({ email, password });
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        // console.log("login form", response);

        const res_data = await response.json();
        // console.log("data i'm lokin for", res_data);
        if (response.ok) {
          storeTokenInLS(res_data.token);
          setUser({ email: "", password: "" });
          navigate("/");
        } else {
          setErrorMsg(response.message);
          console.log("invalid credential");
        }
      } catch (error) {
        setErrorMsg(error);
        console.log(error);
      }
    }
  };

  return (
    <div className={"container"}>
      <div className={"login"}>
        <div>Login</div>
      </div>
      <div className={"input_container"}>
        <input
          value={email}
          placeholder="Enter email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"input"}
        />
      </div>
      <div className={"input_container"}>
        <input
          value={password}
          placeholder="Enter password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"input"}
        />
      </div>
      <label className="error">{errorMsg}</label>
      <div className={"input_container"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Signin;
