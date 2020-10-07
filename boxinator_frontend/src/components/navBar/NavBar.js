import React, {Fragment} from "react";
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/cjs/Navbar";
import {Form, Button, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { POSTLOGOUT } from "../../api/CRUD";
import { useHistory } from "react-router-dom";


    const NavBar = ({userInfo, clearUserInfo}) => {
        let history = useHistory();
    const logout = async (e) => {
        e.preventDefault();
           await POSTLOGOUT('/logout').then(res =>{
            localStorage.setItem("token","");
            localStorage.setItem("id","");
            clearUserInfo();
            history.push("/")
           }).catch(err => console.log(err));
        
    };
    return (
        <div className="navContainer">
            <Navbar bg="dark" variant="dark">

                <Navbar.Brand><Link to="/">Boxinator</Link></Navbar.Brand>

                {
                   userInfo.accountType === "ADMINISTRATOR" ? (
                        <Fragment>
                            <Nav className="mr-auto">
                                <Nav.Link><Link to="/adminMainPage">admin page</Link></Nav.Link>
                                <Nav.Link><Link to="/adminAccount">Admin account</Link></Nav.Link>
                            </Nav>
                            <Form inline>
                                <Button variant="outline-info" onClick={logout}>Logout</Button>
                            </Form>
                        </Fragment>
                    ) : userInfo.accountType === "REGISTERED_USER" ? (
                        <Fragment>
                            <Nav className="mr-auto">
                            
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
                            </Nav>
                            <Form inline>
                               <Link to="/register" style={{paddingRight:12}}><Button variant="outline-info">Register</Button></Link>
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