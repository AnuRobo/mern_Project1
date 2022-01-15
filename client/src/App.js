import React, { createContext, useReducer } from "react";
import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Errorpage from "./components/Error/Errorpage";
import Logout from "./components/Logout/Logout";
import { Routes, Route } from "react-router-dom";
import { initialState, reducer } from "./reducer/UserReducer";
import "./App.css";

// contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutme" element={<AboutMe />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div class="container">
      {/* two values state and dispatch is to be changed in login and logout page */}
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <div className="container2">
          <Routing />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
