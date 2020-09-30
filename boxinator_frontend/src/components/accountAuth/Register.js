import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {POSTDEFAULT} from '../../api/CRUD'

const Register = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setBirthDate] = useState('');
    const [countryOfResidence, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errorMessage, setError] = useState({firstname: '', lastname: '', email: '', password: ''});

    const formValid = (formErrors) => {
        const formFields = { firstname: firstname, lastname: lastname, email: email, password: password}
        let valid = true;

        // validate if form errors is empty
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false);
        });

        // validate if the form was filled out
        Object.values(formFields).forEach(val => {
            val === '' && (valid = false);
        });

        return valid;
    };

    const onSubmitForm = async e => {
        e.preventDefault();

        const body = {
            firstname,
            lastname,
            email,
            dateOfBirth,
            countryOfResidence,
            zipcode,
            contactNumber,
            password
        };
        if (formValid(errorMessage)) {
            await POSTDEFAULT('/user', body).then(res => {
                alert(res.text());
            }).catch(err => console.log(err));
        } else {
            alert('Invalid credentials ! Make sure that all the required fields filled');
        }

        // try {
        //     if(formValid(errorMessage)) {
        //         await fetch(
        //             "http://localhost:8080/api/user",
        //             {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-type": "application/json"
        //                 },
        //                 body: JSON.stringify(body)

        //             }
        //         ).then(response => response.text())
        //             .then(text => alert(text))
        //         document.getElementById("registerForm").reset();//Find a better way
        //     }else {
        //         alert('Invalid credentials ! Make sure that all the required fields filled')
        //         console.error('invalid information !');
        //     }
        // } catch (err) {
        //     console.error(err.message);
        // }
    };

    // const clearForm = () => {
    //     setFirstname('');
    //     setLastname('');
    //     setEmail('');
    //     setPassword('');
    //     setBirthDate('');
    //     setZipcode('');
    //     setContactNumber('');
    // }
    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const onFirstnameChanged = ev =>{
        setFirstname(ev.target.value.trim());
        if(firstname.length < 2 && firstname.length > 0 ){
            setError({firstname: 'You must have 2 characters or more !'}) ;
        }else if(firstname.length >= 2) {
            setError({firstname: ''});
        }
    }
    const onLastnameChanged = ev => {
        setLastname(ev.target.value.trim());
        if(lastname.length < 2 && lastname.length > 0){
            setError({lastname: 'You must have 2 characters or more !'}) ;
        }else  if(lastname.length >= 2){
            setError({lastname: ''});
        }
    }
    const onEmailChanged = ev => {
        setEmail(ev.target.value.trim());
        if(emailRegex.test(email) && email.length > 0){
            setError({email: ''})
        }else {
            setError({email: 'Invalid email address !'});
        }
    }
    const onPasswordChanged = ev => {
        setPassword(ev.target.value.trim());
        if(password.length < 6 && password.length > 0){
            setError({password: 'Minimum 6 characters !'}) ;
        }else {
            setError({password: ''});
        }
    }

    const onBirthDateChanged = ev => setBirthDate(ev.target.value.trim());
    const onCountryChanged = ev => setCountry(ev.target.value.trim());
    const onZipcodeChanged = ev => setZipcode(ev.target.value.trim());
    const onContactNumberChanged = ev => setContactNumber(ev.target.value.trim());
    return (
        <div className="registerContainer">
            <h2>Register new account : </h2>
            <br></br>
            <Form onSubmit={onSubmitForm} id="registerForm">
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" placeholder="Enter firstname" onChange={onFirstnameChanged}/>
                       <span className="errorMessage">{errorMessage.firstname}</span>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" placeholder="Lastname" onChange={onLastnameChanged}/>
                        <span className="errorMessage">{errorMessage.lastname}</span>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={onEmailChanged}/>
                        <span className="errorMessage">{errorMessage.email}</span>

                    </Form.Group>
                </Form.Row>
                <div>
                    <label>Date of birth: </label>
                    <input type="date" onChange={onBirthDateChanged} defaultValue={Date.now()}/>
                </div>
                <Form.Row>
                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Country of residence :</Form.Label>
                        <Form.Control type="text" placeholder="Country of residence" onChange={onCountryChanged}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip code/Postal code :</Form.Label>
                        <Form.Control type="text" placeholder="Zip code" onChange={onZipcodeChanged}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Contact number :</Form.Label>
                        <Form.Control type="text" placeholder="Enter contact number" onChange={onContactNumberChanged}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" onChange={onPasswordChanged}/>
                        <span className="errorMessage">{errorMessage.password}</span>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={onPasswordChanged}/>
                    </Form.Group>
                </Form.Row>
                <br></br>
                <div>
                    <Button variant="secondary" type="submit">Register</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/login">Already registered? Login here</Link>
        </div>
    );
}
export default Register;