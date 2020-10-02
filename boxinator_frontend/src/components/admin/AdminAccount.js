import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AdminUpdateUserDialog from "../Dialog/AdminUpdateUserDialog";
import {formValid, validateEmail, validateIsNumber, validateName} from "../validation/validation.js";

const AdminAccount = () => {
    const [userInfo, setUserInfo] = useState({})
    const [firstname, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const accountId = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    const history = useHistory();
    let UpdateUser = "Update";

    const formFields = { firstname: userInfo.firstname, lastname: userInfo.lastname, email: userInfo.email, contactNumber:userInfo.contactNumber, zipcode:userInfo.zipcode}

    useEffect(()=>{
        console.log("Account id :" ,accountId)
        if(!accountId){
                history.push("/homePage");
        }else{

            axios.get(`http://localhost:8080/api/user/${accountId}`, { headers: {'Authorization': token} })
                .then(res=>{
                    
                    setUserInfo(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [])
    const onSubmitForm = async e => {
        e.preventDefault();
        if(formValid(errorMessage, formFields)) {
            const body = {email: userInfo.email, accountType: userInfo.accountType,
                 firstname: userInfo.firstname, lastname: userInfo.lastname, dateOfBirth: userInfo.dateOfBirth, countryOfResidence: userInfo.countryOfResidence, zipcode: userInfo.zipcode, contactNumber: userInfo.contactNumber };
        
            await axios.put(`http://localhost:8080/api/user/${userInfo.id}`, body, { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
                // alert("Profile has been updated!")
                history.push("/adminMainPage")
               console.log(res);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
        }else{
            alert('Invalid credentials ! Make sure that all the required fields filled');
        }
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
    const onPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onConfirmPasswordChanged = ev => setConfirmPassword(ev.target.value.trim());
    return (
        <div className="container">
           <h1>{userInfo.firstname}'s Account : </h1>
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
                        <Form.Control type="password" value={userInfo.password} disabled placeholder="Enter password..." onChange={onPasswordChanged}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password"  value={userInfo.password} disabled placeholder="Confirm password..." onChange={onConfirmPasswordChanged}/>
                    </Form.Group> */}
                </Form.Row>

                <Form.Row>
                <select name="accountType" onChange={onUserInfoChanged} value={userInfo.accountType}>
                        <option key="ADMINISTRATOR" value="ADMINISTRATOR">ADMINISTRATOR</option>
                        <option key="REGISTERED_USER" value="REGISTERED_USER">REGISTERED_USER</option>
                    </select>
                </Form.Row>
                <br></br>
                <div>
                    {/* <Button type="submit" variant="secondary">Save changes</Button> */}
                    <AdminUpdateUserDialog onSubmitForm={onSubmitForm} userInfo={userInfo} operation={UpdateUser}/>                   
                </div>
            </Form>
            <br></br>
            {/* <Link to="/"><Button variant="success">Home</Button></Link> */}
        </div>
    );
}
export default AdminAccount;