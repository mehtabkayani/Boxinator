import React from "react";
import {Link} from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/cjs/Navbar";
import  {Form, Nav} from "react-bootstrap";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

/* import { makeStyles } from '@material-ui/core/styles';
 import AppBar from '@material-ui/core/AppBar';
 import Toolbar from '@material-ui/core/Toolbar';
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import IconButton from '@material-ui/core/IconButton';
 import MenuIcon from '@material-ui/icons/Menu';

 const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
   },
   menuButton: {
        marginRight: theme.spacing(2),
   },
    title: {
        flexGrow: 1,
  },
 }));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
           <AppBar position="static">
               <Toolbar>
                   <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                   </IconButton>
                     <Typography variant="h6" className={classes.title}>
                        <Link to="/">Home</Link>
                     </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/mainPage">Main page</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                       <Link to="/userAccount">User account</Link>
                     </Typography>
                     <Typography variant="h6" className={classes.title}>
                        <Link to="/adminMainPage">admin page</Link>
                     </Typography>
                     <Link to="/login"><Button color="inherit">Login</Button></Link>
                </Toolbar>
            </AppBar>
         </div>
     );
 }*/

  const NavBar = () => {
   return (
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
     <Nav.Link>  <Link to="/">Home</Link></Nav.Link>
        <Nav.Link>   <Link to="/mainPage">Main page</Link></Nav.Link>
        <Nav.Link>   <Link to="/userAccount">User account</Link></Nav.Link>
        <Nav.Link>   <Link to="/adminMainPage">admin page</Link></Nav.Link>
  </Nav>
    <Form inline>
        <Link to="/login"><Button variant="outline-info">Login</Button></Link>
    </Form>
</Navbar>
 //        <div>
 //            <Navbar className="navbar navbar-dark bg-dark">
 //                <Link to="/"><Button>Home</Button></Link>
 //               <Link to="/login"><button>Login here</button></Link>
 //                <Link to="/register"><button>register new account</button></Link>
 //                <Link to="/mainPage"><button>Main page</button></Link>
 //                <Link to="/userAccount"><button>User account</button></Link>
 //                <Link to="/adminMainPage"><button>admin page</button></Link>
 //           </Navbar>
 //        </div>
          );
  }
 export default NavBar;