import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {validateName, formValid, validateEmail, validateIsNumber} from '../validation/validation.js';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200
        
        
      },
    },
  }));

const UserAccount = () => {
    const [userInfo, setUserInfo] = useState({})
    const [firstname, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const accountId = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState({firstname: '', lastname: '', email: '', password: '', confirmPassword:'', contactNumber:'', zipcode:''});
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
            const body = {firstname: userInfo.firstname, lastname: userInfo.lastname, email: userInfo.email, zipcode: userInfo.zipcode,
            contactNumber: userInfo.contactNumber, dateOfBirth: userInfo.dateOfBirth, countryOfResidence: userInfo.countryOfResidence, accountType: userInfo.accountType};
        
            await axios.put(`http://localhost:8080/api/user/${userInfo.id}`, body, { headers: {'Authorization': localStorage.getItem('token')} })
            .then(res=>{
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
            <h1>User Account : </h1>
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
                {/* <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password..." onChange={onPasswordChanged}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password..." onChange={onConfirmPasswordChanged}/>
                    </Form.Group>
                </Form.Row> */}

                <br></br>
                <div>
                    <Button type="submit" variant="outline-danger">Save changes</Button>
                </div>
            </Form>
            <br></br>
            <Link to="/"><Button variant="success">Home</Button></Link>
        </div>
    );
}
export default UserAccount;