import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {useParams} from "react-router";
import {DELETE} from '../../api/CRUD'

const UpdateUser = () => {
    const {id} = useParams();
    const [userInfo, setUserInfo] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();


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

            await axios.put(`http://localhost:8080/api/user/${userInfo.id}`, body, {headers: {'Authorization': localStorage.getItem('token')}})
                .then(res => {
                    console.log(res);
                    alert(`You have updated ${userInfo.firstname}`)
                    history.push("/adminMainPage")
                })
                .catch(err => {
                    console.log("Error: ", err);
                })
        }

    const onUserInfoChanged = e => {
        const {name, value} = e.target;
        setUserInfo(prevState => ({...prevState, [name]: value}));
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
        let result = window.confirm(`Want to delete? ${userInfo.firstname} ${userInfo.lastname}`);
 
   
        if (result) {
            console.log(userInfo.email)
        axios.delete("http://localhost:8080/api/user", {
            headers: { Authorization: localStorage.getItem('token'), data: userInfo.email}})
         .then(res => {
             console.log(res);
             alert(`You have deleted ${userInfo.firstname}`)
             history.push("/allUsers")
            })
            .catch(err => {
                console.log("Error: ", err);
            }) 
        }

    }
    const onPasswordChanged = ev => setPassword(ev.target.value.trim());
    const onConfirmPasswordChanged = ev => setConfirmPassword(ev.target.value.trim());

  


    return (
       

        <div className="accountContainer"  style={{
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            {userInfo.firstname ? <h1>{userInfo.firstname}´s Account</h1> : "" }
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
            <br></br>

                  <Form.Row>
                <select name="accountType" onChange={onUserInfoChanged} value={userInfo.accountType}>
                        <option key="GUEST" value="GUEST">GUEST</option>
                        <option key="REGISTERED_USER" value="REGISTERED_USER">REGISTERED_USER</option>
                        <option key="ADMINISTRATOR" value="ADMINISTRATOR">ADMINISTRATOR</option>
                    </select>
                </Form.Row>
                <br></br>
                <div>
                    <Button type="submit" variant="secondary">Save changes</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
            </Form>
            {/* <Link to="/"><Button variant="success">Home</Button></Link> */}
        </div>
    );
}
export default UpdateUser;