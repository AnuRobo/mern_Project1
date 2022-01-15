import React,{useEffect, useState} from "react";
import "../Home/home.css";

const Home = () => {
  const [userName, setUserName] = useState("")
  const userHomePage= async ()=>{
    try{
      const res = await fetch("/home",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })

      const resData = await res.json()
      setUserName(resData.name)

      if(res.status !== 200){
        throw new Error("Data not received")
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    userHomePage()
  },[])

  // console.log(userData)
  return (
    <>
      <section className="home-container flex">
        <h4>welcome</h4>
        <h1>{userName ? userName : "we are the mERN developer"}</h1>
        {userName && <h4>Happy to see you back</h4>}      
      </section>
    </>
  );
};

export default Home;
