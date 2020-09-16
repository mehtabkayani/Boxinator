import React from "react";
import { Link } from 'react-router-dom';
import {Form, Button} from "react-bootstrap";

const Login = () => {
    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <br></br>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <br></br>
                <div>
                    <Button variant="secondary" >Login</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/register">Does not have an account ! register new account</Link>
        </div>
    );
}
export default Login;