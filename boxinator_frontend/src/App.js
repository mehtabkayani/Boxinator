import React, {useEffect, useState} from 'react';
import './App.css';
import history from './history';
import {
    BrowserRouter as Router,
    // Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Login from "./components/accountAuth/Login";
import Register from "./components/accountAuth/Register";
import MainPage from "./components/user/MainPage";
import MainPage2 from "./components/user/MainPage2";
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

import SpecificShipment from './components/admin/SpecificShipment';
import AddCountry from "./components/admin/AddCountry";
import UpdateCountry from "./components/admin/UpdateCountry";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const getRouts = async accountId => {
        await axios.get('http://localhost:8080/api/user/ ' + accountId, {headers: {'Authorization': localStorage.getItem('token')}})
            .then(res => {
                console.log(res.data);
                setUserInfo(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    useEffect(() => {
        const isToken = localStorage.getItem('token');
        const isId = localStorage.getItem('id');
        if (isToken && isId && getRouts(isId)) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [])


    return (
        <div className="App">
            <Router>
                <NavBar isAccountType={userInfo.accountType} setAuth={setAuth}
                        isAuthenticated={isAuthenticated}></NavBar>
                <h1>{userInfo.accountType}</h1>
                <Switch>

                    <Route exact
                           path="/login"
                           render={props => {
                               if (!isAuthenticated) {
                                   return <Login{...props} setAuth={setAuth} getRouts={getRouts}/>
                               } else if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                                   return <Redirect to="/adminMainPage"/>
                               } else if (isAuthenticated && userInfo.accountType === "REGISTERED_USER") {
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
                            return <MainPage2/>
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/newShipment" render={props => {
                        if (isAuthenticated && userInfo.accountType === "REGISTERED_USER") {
                            return <NewShipment/>
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/adminMainPage" render={props => {
                        if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                            return <AdminMainPage/>
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/country" render={props => {
                        if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                            return <CountryCost/>
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>
                    <Route exact path="/allUsers" render={props => {
                        if (isAuthenticated && userInfo.accountType === "ADMINISTRATOR") {
                            return <AllUsers/>
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>


                    <Route exact path="/addShipmentGuest" render={props => {
                        if (!isAuthenticated) {
                            return <AddShipmentGuest/>
                        } else {
                            return <Redirect to="/userAccount"/>
                        }
                    }}/>
                    <Route exact path="/" render={props => {
                        if (!isAuthenticated) {
                            return <HomePage/>
                        } else {
                            return <Redirect to="/userAccount"/>
                        }
                    }}/>


                    <Route path="/specificShipment" render={props => {
                        if (!isAuthenticated) {
                            return <SpecificShipment {...props}/>
                        } else {
                            return <Redirect to="/userAccount"/>
                        }
                    }}/>
                    <Route exact path="/updateCountry/:id/:name/:number/:code" render={props => <UpdateCountry />}/>
                    <Route path="/addShipmentGuest" component={AddShipmentGuest}/>
                    <Route path="/mainPage2" component={MainPage}/>
                    <Route path="/addCountry" component={AddCountry}/>
                    <Route path="/" component={HomePage}/>


                </Switch>

            </Router>
        </div>
    );
}

export default App;
