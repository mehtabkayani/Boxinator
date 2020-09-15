import React from "react";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <form >
                <h1>Login : </h1>
                <div>
                    <label>Username: </label>
                    <input type="text" placeholder="Enter username"  />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" placeholder="Enter password"  />
                </div>
                <br></br>
                <div>
                    <button >Login</button>
                </div>
            </form>
            <br></br>
            <Link to="/register">Does not have an account ! register new account</Link>
        </div>
    );
}
export default Login;