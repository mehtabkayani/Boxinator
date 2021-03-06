import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {useParams} from "react-router";
import {PUT, GET} from '../../api/CRUD';
import AdminUpdateUserDialog from "../Dialog/AdminUpdateUserDialog";
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {validateName, formValid, validateEmail, validateIsNumber} from '../validation/validation.js';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const UpdateUser = () => {
  const classes = useStyles();
    const {id} = useParams();
    const [userInfo, setUserInfo] = useState({})
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    let DeleteUser = "Delete";
    let UpdateUser = "Update";
  
    const [errorMessage, setErrorMessage] = useState({firstname: '', lastname: '', email: '', contactNumber:'', zipcode:''});
    const formFields = { firstname: userInfo.firstname, lastname: userInfo.lastname, email: userInfo.email, contactNumber:userInfo.contactNumber, zipcode:userInfo.zipcode}

    useEffect(()=>{
            GET(`/user/${id}`).then(res => setUserInfo(res.data)).catch(err => console.log(err));
    }, []);
    
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
            await PUT(`/user/${userInfo.id}`, body).then(res => history.push("/allUsers")).catch(err => console.log(err));
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

        axios.delete("https://boxinator-backend-spring.herokuapp.com/api/user", {
            headers: { Authorization: localStorage.getItem('token'), data: userInfo.email}})
         .then(res => {
             console.log(res);
             history.push("/allUsers")
            })
            .catch(err => {
                console.log("Error: ", err);
            }) 

    }
    const onPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onConfirmPasswordChanged = ev => setConfirmPassword(ev.target.value.trim());


    return (
        <div className="divPadding">
            <Link to="/allUsers" className="floatLeftBtn"><Button variant="outlined" color="primary">All users</Button></Link>
        <div className="container">
        {userInfo.firstname ? <h1>{userInfo.firstname}´s Account</h1> : "" }
        {userInfo.accountType !== 'GUEST' ?
            <>
        <br></br>
        <Form key={userInfo.id} onSubmit={onSubmitForm} className="form-container">
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control name="firstname" type="text" placeholder={userInfo.firstname} value={userInfo.firstname} disabled/>
                    <span className="errorMessage">{errorMessage.firstname}</span>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control name="lastname" type="text" placeholder={userInfo.lastname} value={userInfo.lastname} disabled/>
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
        <br></br>
   <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Account role</InputLabel>
    <Select
        name= "accountType"
      labelId="select-label"
      id="simple-select"
      value={userInfo.accountType}
      onChange={onUserInfoChanged}
    >
      <MenuItem value={"REGISTERED_USER"}>USER</MenuItem>
      <MenuItem value={"ADMINISTRATOR"}>ADMINISTRATOR</MenuItem>
    </Select>
  </FormControl>
            <br></br>
            <div style={{display:'flex'}}>
                <AdminUpdateUserDialog onSubmitForm={onSubmitForm} userInfo={userInfo} operation={UpdateUser}/>                   
                <AdminUpdateUserDialog onSubmitForm={handleDelete} userInfo={userInfo} operation={DeleteUser}/>
            </div>
        </Form>
        </>
 : 
     <>
        <br></br>
        <Form key={userInfo.id} onSubmit={onSubmitForm} className="form-container">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder={userInfo.email} value={userInfo.email}disabled/>
                    <span className="errorMessage">{errorMessage.email}</span>
                </Form.Group>
            </Form.Row>               
        <br></br>
   <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Account role</InputLabel>
    <Select
        name= "accountType"
      labelId="select-label"
      id="simple-select"
      value={userInfo.accountType}
        disabled
    >
      <MenuItem value={"GUEST"}>Guest</MenuItem>
      <MenuItem value={"REGISTERED_USER"}>USER</MenuItem>
      <MenuItem value={"ADMINISTRATOR"}>ADMINISTRATOR</MenuItem>
    </Select>
  </FormControl>
            <br></br>
            <div style={{display:'flex'}}>
                <AdminUpdateUserDialog onSubmitForm={handleDelete} userInfo={userInfo} operation={DeleteUser}/>
            </div>
        </Form>
        </>
 }       
    </div>
        </div>

    );
}
export default UpdateUser;