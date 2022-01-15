import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// importing contextAPI
import { UserContext } from "../../App";

const Logout = () => {
  // contextAPI consumer getting values from contextAPI from provider
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  //  using promisses

  useEffect(() => {
    const gatheringData = async () => {
      try {
        const res = await fetch("/logout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Cotent-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.status === 200) {
          dispatch({ type: "USER", payload: false });
          navigate("/login");
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    gatheringData();
  });
  return (
    <>
      <h1>lougout page</h1>
    </>
  );
};

export default Logout;
