import React from "react";
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/cjs/Navbar";
import {Form, Button, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    return (
        <div className="navContainer">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand><Link to="/">Boxinator</Link></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link> <Link to="/">Home</Link></Nav.Link>
                <Nav.Link> <Link to="/mainPage">Main page</Link></Nav.Link>
                <Nav.Link> <Link to="/userAccount">User account</Link></Nav.Link>
                <Nav.Link> <Link to="/adminMainPage">admin page</Link></Nav.Link>
            </Nav>
            <Form inline>
                <Link to="/login"><Button variant="outline-info">Login</Button></Link>
            </Form>
        </Navbar>
        </div>
    );
}
export default NavBar;