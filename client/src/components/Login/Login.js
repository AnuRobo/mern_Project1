import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginpic from "../../images/signin.svg";
import { UserContext } from "../../App";
import "../Login/login.css";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // context API consumer
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  let inputBoxName, inputBoxValue;
  const loginDataInput = (event) => {
    inputBoxName = event.target.name;
    inputBoxValue = event.target.value;

    setLoginData({ ...loginData, [inputBoxName]: inputBoxValue });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = loginData;
    // console.log(email, password);
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const resData = res.json();
    console.log(res.status);
    if (res.status === 400 || !resData) {
      window.alert("invalid Credentials");
    } else {
      // dispatch from useReducer in App.js is access by using ContextAPI
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      navigate("/");
    }
  };
  return (
    <>
      <section className="signin flex screenwidth">
        <div className="signin-container">
          <h1 className="signin-heading">Sign In</h1>
          <div className="signinForm-container flex">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="signin pic" />
              </figure>
            </div>
            <form method="POST" className="signin-form flex">
              <div className="form-group">
                <label htmlFor="email">
                  <i class="zmdi zmdi-account"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email"
                  required
                  autoFocus
                  // autoComplete="off"
                  value={loginData.email}
                  onChange={loginDataInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i class="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                  required
                  // autoComplete="off"
                  value={loginData.password}
                  onChange={loginDataInput}
                />
              </div>

              <div className="form-btn-container flex">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="signin"
                  onClick={loginUser}
                />
                <p>
                  <span>Click here to</span>
                  <Link className="login-link" to="/register">
                    Register
                  </Link>
                </p>
              </div>
              <div className="social-links-container flex">
                <p>Or login with</p>
                <div className="social-links">
                  <i class="zmdi zmdi-facebook-box"></i>
                  <i class="zmdi zmdi-twitter-box"></i>
                  <i class="zmdi zmdi-google-plus-box"></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
