import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {useParams} from "react-router";
import {DELETE} from '../../api/CRUD';
import AdminUpdateUserDialog from "../Dialog/AdminUpdateUserDialog";


import {validateName, formValid, validateEmail, validateIsNumber} from '../validation/validation.js';

const UpdateUser = () => {
    const {id} = useParams();
    const [userInfo, setUserInfo] = useState({})
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    let DeleteUser = "Delete";
    let UpdateUser = "Update";

    const [password1, setPassword1] = useState('');
  
    const [errorMessage, setErrorMessage] = useState({firstname: '', lastname: '', email: '', contactNumber:'', zipcode:''});
    const formFields = { firstname: userInfo.firstname, lastname: userInfo.lastname, email: userInfo.email, contactNumber:userInfo.contactNumber, zipcode:userInfo.zipcode}

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


            const body = {
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
                zipcode: userInfo.zipcode,
                contactNumber: userInfo.contactNumber,
                dateOfBirth: userInfo.dateOfBirth,
                countryOfResidence: userInfo.countryOfResidence,
                accountType: userInfo.accountType,
                password

            };
        if(formValid(errorMessage, formFields)) {
            await axios.put(`http://localhost:8080/api/user/${userInfo.id}`, body, {headers: {'Authorization': localStorage.getItem('token')}})
                .then(res => {
                    console.log(res);
                    //alert(`You have updated ${userInfo.firstname}`)
                    history.push("/allUsers")
                })
                .catch(err => {
                    console.log("Error: ", err);
                })
        }else {    alert('Invalid credentials ! Make sure that all the required fields filled');}
        }


    const onUserInfoChanged = e => {
        const {name, value} = e.target;
        setUserInfo(prevState => ({...prevState, [name]: value}));

        switch (name) {
            case "firstname":
                setErrorMessage({firstname: validateName(value)}) ;

                break;
            case "lastname":
                setErrorMessage({lastname: validateName(value)}) ;
                break;
            case "email":
                setErrorMessage({email: validateEmail(value)}) ;
                break;
            case "contactNumber":
                setErrorMessage({contactNumber: validateIsNumber(value)}) ;
                break;
            case "zipcode":
                setErrorMessage({zipcode: validateIsNumber(value)}) ;
                break;
            default:
                break;
        }
    };


    const handleDelete = async () => {
        // e.preventDefault();
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
        console.log(body);
        // let result = window.confirm(`Want to delete? ${userInfo.firstname} ${userInfo.lastname}`);
 
   
        // if (result) {
            console.log(userInfo.email)
        axios.delete("http://localhost:8080/api/user", {
            headers: { Authorization: localStorage.getItem('token'), data: userInfo.email}})
         .then(res => {
             console.log(res);
            // alert(`You have deleted ${userInfo.firstname}`)
             history.push("/allUsers")
            })
            .catch(err => {
                console.log("Error: ", err);
            }) 
        // }

    }
    const onPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onConfirmPasswordChanged = ev => setConfirmPassword(ev.target.value.trim());

    return (
       

        <div className="container"  style={{
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            {userInfo.firstname ? <h1>{userInfo.firstname}´s Account</h1> : "" }
            <br></br>
            <Form key={userInfo.id} onSubmit={onSubmitForm} className="form-container">

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control name="firstname" type="text" placeholder={userInfo.firstname} value={userInfo.firstname} onChange={onUserInfoChanged}/>
                        <span className="errorMessage">{errorMessage.firstname}</span>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control name="lastname" type="text" placeholder={userInfo.lastname} value={userInfo.lastname} onChange={onUserInfoChanged}/>
                        <span className="errorMessage">{errorMessage.lastname}</span>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder={userInfo.email} value={userInfo.email} onChange={onUserInfoChanged}/>
                        <span className="errorMessage">{errorMessage.email}</span>
                    </Form.Group>
                </Form.Row>               
                {/* <Form.Row>

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
                        <span className="errorMessage">{errorMessage.zipcode}</span>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridNumber">
                        <Form.Label>Contact number :</Form.Label>
                        <Form.Control name="contactNumber" type="text" placeholder={userInfo.contactNumber} value={userInfo.contactNumber} onChange={onUserInfoChanged}/>
                        <span className="errorMessage">{errorMessage.contactNumber}</span>
                    </Form.Group>
                </Form.Row>
                <Form.Row>

                    {/* <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password..." onChange={onPasswordChanged}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password..." onChange={onConfirmPasswordChanged}/>
                    </Form.Group>

                </Form.Row> 
                <div>
                    {errorMessage}
                </div> */}
            <br></br>

                  <Form.Row>
                <select name="accountType" onChange={onUserInfoChanged} value={userInfo.accountType}>
                        <option key="GUEST" value="GUEST">GUEST</option>
                        <option key="REGISTERED_USER" value="REGISTERED_USER">REGISTERED_USER</option>
                        <option key="ADMINISTRATOR" value="ADMINISTRATOR">ADMINISTRATOR</option>
                    </select>

                </Form.Row>
                <br></br>
                <div style={{display:'flex'}}>
                    {/* <Button type="submit" variant="secondary">Save changes</Button> */}
                    
                    <AdminUpdateUserDialog onSubmitForm={onSubmitForm} userInfo={userInfo} operation={UpdateUser}/>                   
                    <AdminUpdateUserDialog onSubmitForm={handleDelete} userInfo={userInfo} operation={DeleteUser}/>

                    {/* <Button variant="danger" onClick={handleDelete}>Delete</Button> */}
                </div>
            </Form>
            {/* <Link to="/"><Button variant="success">Home</Button></Link> */}
        </div>
    );
}
export default UpdateUser;