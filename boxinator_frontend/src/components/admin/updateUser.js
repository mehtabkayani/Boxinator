import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {useParams} from "react-router";

const UpdateUser = () => {
    const {id } = useParams();
    const [userInfo, setUserInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const [password1, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(()=>{
      let token =  localStorage.getItem('token')
        axios.get(`http://localhost:8080/api/user/${id}`, { headers: {'Authorization': token} })
            .then(res=>{
                console.log(res.data);
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err);
            })


    }, [id])

    const onSubmitForm = async e => {
        e.preventDefault();

//, accountType: userInfo.accountType
            const body = {
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
                zipcode: userInfo.zipcode,
                contactNumber: userInfo.contactNumber,
                dateOfBirth: userInfo.dateOfBirth,
                countryOfResidence: userInfo.countryOfResidence,
                accountType: userInfo.accountType,
                password: userInfo.password

            };

            await axios.put(`http://localhost:8080/api/user/${userInfo.id}`, body, {headers: {'Authorization': localStorage.getItem('token')}})
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log("Error: ", err);
                })
        }

    const onUserInfoChanged = e => {
        const {name, value} = e.target;
        setUserInfo(prevState => ({...prevState, [name]: value}));
    };
    const onPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onConfirmPasswordChanged = ev => setConfirmPassword(ev.target.value.trim());

console.log(userInfo);

    return (

        <div className="accountContainer">
            <h1>{userInfo.firstname}'s Account : </h1>
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
                        <Form.Control name="countryOfResidence" type="text" placeholder={userInfo.countryOfResidence} value={userInfo.countryOfResidence} onChange={onUserInfoChanged}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip code/Postal code :</Form.Label>
                        <Form.Control name="zipcode" type="text" placeholder={userInfo.zipcode} value={userInfo.zipcode} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridNumber">
                        <Form.Label>Contact number :</Form.Label>
                        <Form.Control name="contactNumber" type="text" placeholder={userInfo.contactNumber} value={userInfo.contactNumber} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    {/* <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={userInfo.password} disabled placeholder="Enter password..." onChange={onPasswordChanged}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password"  value={userInfo.password} disabled placeholder="Confirm password..." onChange={onConfirmPasswordChanged}/>
                    </Form.Group> */}
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridNumber">
                        <Form.Label>User Role :</Form.Label>
                        <Form.Control name="accountType" type="text" placeholder={userInfo.accountType} value={userInfo.accountType} onChange={onUserInfoChanged}/>
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
export default UpdateUser;