import React from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";

const Register = () => {
    return (
        <div className="registerContainer">
            <h2>Register new account : </h2>
            <br></br>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" placeholder="Enter firstname"/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" placeholder="Lastname"/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>
                </Form.Row>
                <div>
                    <label>Date of birth: </label>
                    <input type="date" placeholder="Enter e-mail"/>
                </div>
                <Form.Row>
                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Country of residence :</Form.Label>
                        <Form.Control placeholder="1234 Main St"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip code/Postal code :</Form.Label>
                        <Form.Control/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Contact number :</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact number"/>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                </Form.Row>
                <br></br>
                <Form.Group id="formGridCheckbox">
                    <Form.Label>Check only if you are an admin !</Form.Label>
                    <Form.Check type="checkbox" label="Admin"/>
                </Form.Group>
                <br></br>
                <div>
                    <Button variant="secondary">Register</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/login">Already registered? Login here</Link>
        </div>
    );
}
export default Register;