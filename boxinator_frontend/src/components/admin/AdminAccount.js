import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AdminAccount = () => {
    const [userInfo, setUserInfo] = useState({})
    const [firstname, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const accountId = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    const history = useHistory();

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
        if(password === confirmPassword){
            setErrorMessage('');
            const body = {email: userInfo.email, accountType: userInfo.accountType};
        
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
            <h1>Admin Account : </h1>
            <br></br>
            <Form key={userInfo.id} onSubmit={onSubmitForm}>
            
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder={userInfo.email} value={userInfo.email} onChange={onUserInfoChanged}/>
                    </Form.Group>
                </Form.Row>               
                {/* <Form.Row>
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

                <label>Shipment status</label>
                <select name="accountType" onChange={onUserInfoChanged}>
                    {/* {printStatusList} */}
                    <option key="ADMINISTRATOR" value="ADMINISTRATOR">ADMINISTRATOR</option>
                    <option key="REGISTERED_USER" value="REGISTERED_USER">REGISTERED_USER</option>                    
                </select>
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
export default AdminAccount;