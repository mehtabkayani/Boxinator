import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";

const UserAccount = () => {
    const [userInfo, setUserInfo] = useState({})


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const accountId = localStorage.getItem('id');

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/user/${accountId}`, { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                console.log(res.data);
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [accountId])

    const onSubmitForm = async e => {
        e.preventDefault();

        if(password === confirmPassword){
            setErrorMessage('');

            const body = {firstname: userInfo.firstname, lastname: userInfo.lastname, email: userInfo.email, zipcode: userInfo.zipcode,
            contactNumber: userInfo.contactNumber, dateOfBirth: userInfo.dateOfBirth, countryOfResidence: userInfo.countryOfResidence, password};

            await axios.put(`http://localhost:8080/api/user/${userInfo.id}`, body, { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
               console.log(res);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
        }else{
            setErrorMessage('Passwords doesnt match');
        }
    }

    const onUserInfoChanged = e => {
        const {name, value} = e.target;
        setUserInfo(prevState => ({...prevState, [name]: value}));
    };


    const onPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onConfirmPasswordChanged = ev => setConfirmPassword(ev.target.value.trim());

    return (

        <div className="accountContainer">
            <h1>User Account : </h1>
            <br></br>
            <Form key={userInfo.id} onSubmit={onSubmitForm}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control name="firstname" type="text" placeholder={userInfo.firstname} value={userInfo.firstname} onChange={onUserInfoChanged}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control name="lastname" type="text" placeholder={userInfo.lastname} value={userInfo.lastname} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder={userInfo.email} value={userInfo.email} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>
                <div>
                    <label>Date of birth: </label>
                    <input name="dateOfBirth" type="date" placeholder={userInfo.dateOfBirth} value={userInfo.dateOfBirth} onChange={onUserInfoChanged}/>
                </div>
                <Form.Row>
                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Country of residence :</Form.Label>
                        <Form.Control name="countryOfResidence" placeholder={userInfo.countryOfResidence} value={userInfo.countryOfResidence} onChange={onUserInfoChanged}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip code/Postal code :</Form.Label>
                        <Form.Control name="zipcode" placeholder={userInfo.zipcode} value={userInfo.zipcode} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridNumber">
                        <Form.Label>Contact number :</Form.Label>
                        <Form.Control name="contactNumber" type="text" placeholder={userInfo.contactNumber} value={userInfo.contactNumber} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password..." onChange={onPasswordChanged}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password..." onChange={onConfirmPasswordChanged}/>
                    </Form.Group>
                </Form.Row>
                <div>
                    {errorMessage}
                </div>
                <br></br>
                <div>
                    <Button type="submit" variant="secondary">Save changes</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/"><Button variant="success">Home</Button></Link>
        </div>
    );
}
export default UserAccount;