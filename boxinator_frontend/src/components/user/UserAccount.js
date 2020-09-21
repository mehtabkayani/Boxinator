import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";

const UserAccount = () => {
    const [userInfo, setUserInfo] = useState([])

    const accountId = localStorage.getItem('id');

    useEffect(()=>{
        axios.get('http://localhost:8080/api/user/ '+ accountId, { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                console.log(res.data);
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    })
    {/*Not completed maybe show information in another way !! */}
    return (

        <div className="accountContainer">
            <h1>User Account : </h1>
            <br></br>
            <Form key={userInfo.id}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" placeholder={userInfo.firstname}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" placeholder={userInfo.lastname}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder={userInfo.email}/>
                    </Form.Group>
                </Form.Row>
                <div>
                    <label>Date of birth: </label>
                    <input type="date" placeholder={userInfo.dateOfBirth}/>
                </div>
                <Form.Row>
                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Country of residence :</Form.Label>
                        <Form.Control placeholder={userInfo.countryOfResidence}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip code/Postal code :</Form.Label>
                        <Form.Control placeholder={userInfo.zipcode}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridNumber">
                        <Form.Label>Contact number :</Form.Label>
                        <Form.Control type="text" placeholder={userInfo.contactNumber}/>
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
                    <Button variant="secondary">Save changes</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/"><Button variant="success">Home</Button></Link>
        </div>
    );
}
export default UserAccount;