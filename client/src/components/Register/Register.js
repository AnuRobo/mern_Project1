import React, { useState } from "react";
import registrationPic from "../../images/registration0.svg";
import { Link, useNavigate } from "react-router-dom";
import "../Register/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let inputBoxName, inputBoxValue;

  const handleInputs = (event) => {
    // console.log(event);
    inputBoxName = event.target.name;
    inputBoxValue = event.target.value;
    // to get dynamic data we are using square bracket
    setUser({ ...user, [inputBoxName]: inputBoxValue });
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });

    const resData = await res.json();

    if (resData.status === 422 || !resData) {
      window.alert("Invalid Registeration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registeration Successfull");
      console.log("Registeration Successfull");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="registration flex screenwidth">
        <div className="register-container">
          <h1 className="register-heading">Register</h1>
          <div className="registerationForm-container flex">
            <form method="POST" className="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i class="zmdi zmdi-account"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  placeholder="Your Name"
                  required
                  autoFocus
                  value={user.name}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email-Id"
                  required
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <i class="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  placeholder="Mobile Number"
                  required
                  value={user.phone}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <i class="zmdi zmdi-slideshow"></i>
                </label>
                <input
                  type="text"
                  name="work"
                  id="work"
                  autoComplete="off"
                  placeholder="Your Profession"
                  required
                  value={user.work}
                  onChange={handleInputs}
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
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <i class="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  placeholder="Confirm Your Password"
                  required
                  value={user.cpassword}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-btn-container flex">
                <input
                  type="submit"
                  name="register"
                  id="register"
                  className="form-submit"
                  value="register"
                  onClick={PostData}
                />
                <p>
                  <span>if you are already registered click here to</span>
                  <Link className="login-link" to="/login">
                    sign-In
                  </Link>
                </p>
              </div>
            </form>

            <div className="register-image">
              <figure>
                <img src={registrationPic} alt="registration pic" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
