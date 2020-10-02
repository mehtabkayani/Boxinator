import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {POSTDEFAULT} from '../../api/CRUD';
import {validateName, formValid, validateEmail, validateIsNumber, validatePassword, validatePasswordMatch} from '../validation/validation.js';
import trackingLogo from '../../images/registerPage/RegisterTracking.jpg'


const Register = () => {
    const history = useHistory();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [dateOfBirth, setBirthDate] = useState('');
    const [countryOfResidence, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errorMessage, setError] = useState({firstname: '', lastname: '', email: '', password: '', confirmPassword:'', contactNumber:'', zipcode:''});

    const formFields = { firstname: firstname, lastname: lastname, email: email, password: password, confirmPassword:confirmPassword, contactNumber:contactNumber, zipcode:zipcode};


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

        // await POST('/user', body).then(res => {
        //     alert(res.text());
        //     clearForm();
        // }).catch(err => console.log(err));

        // try {
            
        //    await fetch(
        //         "http://localhost:8080/api/user",
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-type": "application/json"
        //             },
        //             body: JSON.stringify(body)

        //         }
        //     ).then(response => response.text())
        //         .then(text =>  alert("You have been successfully registered! \n You have to validate your email account before you can log in."))
        //     document.getElementById("registerForm").reset();//Find a better way

        // } catch (err) {
        //     console.error(err.message);

        if (formValid(errorMessage, formFields)) {
            await POSTDEFAULT('/user', body).then(res => {
                alert("You have been successfully registered! \n You have to validate your email account before you can log in.")
                history.push("/login");
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

    const onFirstnameChanged = ev =>{
        setFirstname(ev.target.value.trim());
        setError({firstname:validateName(ev.target.value)});
    }
    const onLastnameChanged = ev => {
        setLastname(ev.target.value.trim());
        setError({lastname:validateName(ev.target.value)});
    }
    const onEmailChanged = ev => {
        setEmail(ev.target.value.trim());
        setError({email: validateEmail(ev.target.value)});
    }
    const onPasswordChanged = ev => {
        setPassword(ev.target.value.trim());
        setError({password:validatePassword(ev.target.value)});
    }
    const onConfirmPasswordChanged = ev => {
        setconfirmPassword(ev.target.value.trim());
        setError({confirmPassword:validatePasswordMatch(ev.target.value, password)})
    }

    const onZipcodeChanged = ev => {
        setZipcode(ev.target.value.trim());
        setError({zipcode: validateIsNumber(ev.target.value)});
    }

    const onContactNumberChanged = ev => {
        setContactNumber(ev.target.value.trim());
        setError({contactNumber: validateIsNumber(ev.target.value)});
    }
    const onBirthDateChanged = ev => setBirthDate(ev.target.value.trim());
    const onCountryChanged = ev => setCountry(ev.target.value.trim());

    return (

        <div className="container">
            <h2>Register new account : </h2>
            <br></br>
            <Form onSubmit={onSubmitForm} id="registerForm" className="form-container register">
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
                        <span className="errorMessage">{errorMessage.zipcode}</span>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Contact number :</Form.Label>
                        <Form.Control type="text" placeholder="Enter contact number" onChange={onContactNumberChanged}/>
                        <span className="errorMessage">{errorMessage.contactNumber}</span>
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
                        <Form.Control type="password" placeholder="Password" onChange={onConfirmPasswordChanged}/>
                        <span className="errorMessage">{errorMessage.confirmPassword}</span>
                    </Form.Group>
                </Form.Row>
                <br></br>
                <div>
                    <Button variant="secondary" type="submit" className="registerBtn">Register</Button>
                    <Link to="/login">Already registered? Login here</Link>
                </div>
            </Form>
            <br></br>

            <Link to="/login">Already registered? Login here</Link>
            <div> <img src={trackingLogo} className="trackingLogo"></img>
                    {/* <h3><i>Register and keep track of all your shipments!</i></h3> */}
                    </div>

           
    </div>
    );
}
export default Register;