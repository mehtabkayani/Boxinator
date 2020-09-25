import React, {useState} from "react";
import  {Link} from 'react-router-dom';
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
import history from '../../history';



const Login = ({setAuth, getRouts}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');




    const onSubmitForm = async e => {
        e.preventDefault();

            const body = { password, email }

            await axios.post("http://localhost:8080/api/login", body, { headers: {'Authorization': code} })
            .then(res=>{
                console.log("token", res)
               localStorage.setItem('id', res.data.account_id);
               localStorage.setItem('token', res.data.token);

             
            // history.push('/mainPage')


               if(res.data.token && res.data.account_id){
                   getRouts(res.data.account_id);
                   setAuth(true);
               //  window.location = '/mainPage';
               }else{
                   setAuth(false);
               }

            })
            .catch(err => {
                console.log("Error: ", err);
            })
    };


    const onEmailChanged = e => setEmail(e.target.value.trim());
    const onPasswordChanged = e => setPassword(e.target.value.trim());
    const onCodeChanged = (e) => {
        setCode(e.target.value);
    }

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
                <Form.Group>
                    <Form.Label>Code</Form.Label>

                    <Form.Control type="text" placeholder="6-digit code" onChange={onCodeChanged}/>

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