import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/cjs/Navbar";
import {Form, Button, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UPDATE } from "../../api/CRUD";
import axios from 'axios'
import { useHistory } from "react-router-dom";


// const NavBar = ({setAuth, isAccountType, isAuthenticated}) => {
    const NavBar = ({userInfo, clearUserInfo}) => {
        let history = useHistory();
    const logout = async (e) => {
      let t =  localStorage.getItem('token');
        e.preventDefault();
           //axios.post(`http://localhost:8080/api/logout/`, { headers: {'Authorization': localStorage.getItem('token')} }).then(res => console.log(res));

           
            await axios.post("http://localhost:8080/api/logout/", null, { headers: {'Authorization': t} })
            .then( res => {
            localStorage.setItem("token","");
            localStorage.setItem("id","");
            clearUserInfo();
            history.push("/")
            })
      
    };
    return (
        <div className="navContainer">
            <Navbar bg="dark" variant="dark">

                <Navbar.Brand href="/">Boxinator</Navbar.Brand>
{userInfo.accountType}
                {
                   userInfo.accountType === "ADMINISTRATOR" ? (
                        <Fragment>
                            <Nav className="mr-auto">
                                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                                <Nav.Link><Link to="/adminMainPage">admin page</Link></Nav.Link>
                                <Nav.Link><Link to="/userAccount">User account</Link></Nav.Link>
                            </Nav>
                            <Form inline>
                                <Button variant="outline-info" onClick={logout}>Logout</Button>
                            </Form>
                        </Fragment>
                    ) : userInfo.accountType === "REGISTERED_USER" ? (
                        <Fragment>
                            <Nav className="mr-auto">
                                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                                <Nav.Link><Link to="/mainPage">Main page</Link></Nav.Link>
                                <Nav.Link><Link to="/userAccount">User account</Link></Nav.Link>
                            </Nav>

                            <Form inline>
                                <Button variant="outline-info" onClick={logout}>Logout</Button>
                            </Form>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Nav className="mr-auto">
                                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                            </Nav>
                            <Form inline>
                                <Link to="/login"><Button variant="outline-info">Login</Button></Link>
                            </Form>
                        </Fragment>
                    )

                }
            </Navbar>
        </div>
    );
}
export default NavBar;