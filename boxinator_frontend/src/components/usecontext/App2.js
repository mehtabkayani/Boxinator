import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";

import "./style.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    userId: undefined,
    username: undefined,
    userRole: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
       await Axios.post(
        "http://localhost:8080/api/tokenIsValid",null,
        { headers: { "Authorization": token } }
      ).then(res =>   {   
          Axios.get("http://localhost:8080/api/loggedInUser", {
          headers: { "Authorization": token },
        }).then(res => {   
            console.log(res.data)
        setUserData({
          token,
          userId: res.data.id,
          username: res.data.firstname,
          userRole: res.data.accountType
        });
    });
});
      
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}