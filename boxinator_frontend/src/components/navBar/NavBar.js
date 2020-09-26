import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/cjs/Navbar";
import {Form, Button, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({setAuth, isAccountType, isAuthenticated}) => {
    const logout = e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            setAuth(false);
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div className="navContainer">
            <Navbar bg="dark" variant="dark">

                <Navbar.Brand href="/">Boxinator</Navbar.Brand>
                {/*Not done yet, just testing !! */}
                {
                   isAuthenticated && isAccountType === "ADMINISTRATOR" ? (
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
                    ) : isAuthenticated && isAccountType === "REGISTERED_USER" ? (
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