import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AboutMe/aboutme.css";
import profilePic from "../../images/profileImage.png";

const AboutMe = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(true);
  const [userData, setUserData] = useState({})

  const callAboutPage = async () => {
    try {
      const res = await fetch("/aboutme", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // from server (express js) at /aboutme we are sending data of user
      const resData = await res.json();
      // console.log(resData);
      setUserData(resData)

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      // if user is not authenticate thend he/she will be send to login page
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <section className="aboutme-container">
        <form method="GET" className="aboutme-form-container flex">
          <div className="aboutme-form-container1 flex">
            <div className="image-container">
              <img src={profilePic} alt="profile" className="profile" />
            </div>
            <div className="skills-container">
              <h5>skills</h5>
              <p>Express JS</p>
              <p>JavaScript</p>
              <p>React JS</p>
              <p>Node JS</p>
              <p>Python</p>
              <p>HTML</p>
              <p>CSS</p>
            </div>
          </div>
          <div className="aboutme-form-container2">
            <div className="aboutme-form-container2-part1 flex">
              <div className="details-overview-container">
                <h3>{userData.name}</h3>
                <h4>{userData.work}</h4>
                <p>RANKING: 1/10</p>
              </div>
              <div className="editprofile-container">
                <input
                  type="text"
                  className="profile-edit-btn"
                  name="btnAddMore"
                  value="Edit Profile"
                />
              </div>
            </div>
            <div className="aboutme-form-container2-part2">
              <ul className="nav-tabs flex">
                <li
                  className={`nav-item ${tab && "tab-is-active"}`}
                  onClick={() => setTab(true)}
                >
                  About
                </li>
                <li
                  className={`nav-item ${!tab && "tab-is-active"}`}
                  onClick={() => setTab(false)}
                >
                  Timeline
                </li>
              </ul>
              {tab && (
                <div className="tab-pane">
                  <div className="tab-pane-row flex">
                    <label>User ID</label>
                    <p>78685432188634352</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Name</label>
                    <p>{userData.name}</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Email ID</label>
                    <p>{userData.email}</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Phone</label>
                    <p>{userData.phone}</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Profession</label>
                    <p>{userData.work}</p>
                  </div>
                </div>
              )}
              {!tab && (
                <div className="tab-pane">
                  <div className="tab-pane-row flex">
                    <label>Experience</label>
                    <p>Intermediate</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Hourly Charges</label>
                    <p>$5/hr</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Total Projects</label>
                    <p>43</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>English</label>
                    <p>Average</p>
                  </div>
                  <div className="tab-pane-row flex">
                    <label>Availability</label>
                    <p>4 months</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AboutMe;
