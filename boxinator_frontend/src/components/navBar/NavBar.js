import React, {Fragment} from "react";
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/cjs/Navbar";
import  {NavLink,Form, Button, Nav} from "react-bootstrap";
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

                <Navbar.Brand ><Link to="/" style={{color:'white'}} >Boxinator</Link></Navbar.Brand>

                {
                   userInfo.accountType === "ADMINISTRATOR" ? (
                        <Fragment>
                            <Nav className="mr-auto">
                                <Nav.Link><Link to="/adminMainPage" style={{color:'#05d0ef'}}>Admin page</Link></Nav.Link>
                                <Nav.Link><Link to="/adminAccount" style={{color:'#05d0ef'}}>Admin account</Link></Nav.Link>
                            </Nav>
                            <Form inline>
                                <Link to="adminAccount" style={{color:"white", paddingRight:12 }} >{userInfo.firstname} {userInfo.lastname}</Link>
                                <Button variant="outline-info" onClick={logout}>Logout</Button>
                            </Form>
                        </Fragment>
                    ) : userInfo.accountType === "REGISTERED_USER" ? (
                        <Fragment>
                            <Nav className="mr-auto">
                            
                                <Nav.Link><Link to="/mainPage" style={{color:'#05d0ef'}} >Main page</Link></Nav.Link>
                                <Nav.Link ><Link  to="/userAccount" style={{color:'#05d0ef'}} >User account</Link></Nav.Link>
                            </Nav>

                            <Form inline>
                                <Link to="userAccount" style={{color:"white", paddingRight:12 }}>{userInfo.firstname} {userInfo.lastname}</Link>
                                <Button variant="outline-info" onClick={logout}>Logout</Button>
                            </Form>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Nav className="mr-auto">
                                <p>Welcome to Boxinator</p>
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