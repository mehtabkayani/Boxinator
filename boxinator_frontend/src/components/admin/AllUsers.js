import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
import {GET} from '../../api/CRUD'

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        GET('/users').then(res => setUsers(res.data)).catch(err => console.log(err));

        // axios.get('http://localhost:8080/api/users', {headers: {'Authorization': localStorage.getItem('token')}})
        //     .then(res => {
        //         console.log(res.data);
        //         setUsers(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    },[])

    const url = "/updateUser";
    const rows = users.map(user => (
        <Link
            to={`${url}/${user.id}`}>
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.email}</td>
                <td>{user.countryOfResidence}</td>
                <td>{user.contactNumber}</td>
                <Button variant="secondary">Update</Button>
            </tr>
        </Link>
    ));

    return (
        <div className="adminPageContainer">
            <h1>Admin main page : </h1>
            <br></br>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Date of birth</th>
                    <th>email</th>
                    <th>country</th>
                    <th>contact-number</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}
export default AllUsers;