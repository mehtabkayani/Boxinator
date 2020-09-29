import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
// import ErrorNotice from "../error/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [code, setCode] = useState('');
//   const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:8080/api/login",
        loginUser, { headers: {'Authorization': code} }
      ).then(res =>  {             
      setUserData({
        token: res.data.token,
        user: res.data.account_id,
    });
    localStorage.setItem("auth-token", res.data.token);
    });
      
      history.push("/");
    } catch (err) {
    //   err.response.msg && setError(err.response.msg);
    console.log(err.message)
    }
  };
  return (
    <div className="page">
      <h2>Log in</h2>
    
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

<label htmlFor="code">Code</label>
        <input
          id="code"
          type="text"
          onChange={(e) => setCode(e.target.value)}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}