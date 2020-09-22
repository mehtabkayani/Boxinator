import React, {useState} from "react";
import  { Link} from 'react-router-dom';
import {Form, Button} from "react-bootstrap";




const Login = ({setAuth}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { password, email };
            const response = await fetch(
                "http://localhost:8080/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            console.log("result", parseRes);

            if ( parseRes.token) {
                localStorage.setItem('token', parseRes.token);
                localStorage.setItem('id', parseRes.account_id);
                setAuth(true);

            } else {
                setAuth(false);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    const onEmailChanged = ev => setEmail(ev.target.value.trim());
    const onPasswordChanged = ev => setPassword(ev.target.value.trim());


    return (
        <div className="loginContainer">

                    <div>
            <h2>Login</h2>
            <br></br>
            <Form onSubmit={onSubmitForm}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={onEmailChanged}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={onPasswordChanged}/>
                </Form.Group>
                <br></br>
                <div>
                    <Button type="submit" variant="secondary">Login</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/register">Does not have an account ! register new account</Link>
                    </div>
        </div>
    );
}
export default Login;