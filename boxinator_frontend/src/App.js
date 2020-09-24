import React, {useEffect, useState} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Login from "./components/accountAuth/Login";
import Register from "./components/accountAuth/Register";
import MainPage from "./components/user/MainPage";
import NewShipment from "./components/user/NewShipment";
import UserAccount from "./components/user/UserAccount";
import AdminMainPage from "./components/admin/AdminMainPage";
import NavBar from "./components/navBar/NavBar";
import HomePage from "./components/homePage/HomePage";
import AddShipmentGuest from "./components/guest/AddShipmentGuest";
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryCost from "./components/admin/CountryCost";
import AllUsers from "./components/admin/AllUsers";
import axios from "axios";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const accountId = localStorage.getItem('id');

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/ ' + accountId, {headers: {'Authorization': localStorage.getItem('token')}})
            .then(res => {
                console.log(res.data);
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [accountId])

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };


    return (
        <div className="App">
            <Router>
                <NavBar></NavBar>
                <h1>{userInfo.accountType}</h1>
                <Switch>

                    <Route exact
                           path="/login"
                           render={props => {
                               if (!isAuthenticated) {
                                   return <Login{...props} setAuth={setAuth} accountType={userInfo.accountType}/>
                               }
                               if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                                   return <Redirect to="/adminMainPage"/>
                               }
                               if (isAuthenticated && userInfo.accountType === "REGISTERED_USER") {
                                   return <Redirect to="/mainPage"/>
                               }
                           }
                           }/>

                    <Route exact path="/register" render={props => {
                        if (!isAuthenticated) {
                            return <Register/>
                        } else {
                            return <Redirect to="/userAccount"/>
                        }
                    }}/>

                    <Route exact path="/userAccount" render={props => {
                        if (isAuthenticated) {
                            return <UserAccount {...props} setAuth={setAuth}/>
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>

                    <Route exact path="/mainPage" render={props => {
                        if (isAuthenticated && userInfo.accountType === "REGISTERED_USER") {
                            return <MainPage {...props} setAuth={setAuth}/>
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/newShipment" render={props => {
                        if (isAuthenticated && userInfo.accountType === "REGISTERED_USER") {
                            return <NewShipment {...props} setAuth={setAuth}/>
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/adminMainPage" render={props => {
                        if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                            return <AdminMainPage {...props} setAuth={setAuth}/>
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/country" render={props => {
                        if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                            return <CountryCost {...props} setAuth={setAuth}/>
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>
                    <Route exact path="/allUsers" render={props => {
                        if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                            return <AllUsers {...props} setAuth={setAuth}/>
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>

                    <Route path="/addShipmentGuest" component={AddShipmentGuest}/>
                    <Route path="/" component={HomePage}/>

                </Switch>

            </Router>
        </div>
    );
}

export default App;
