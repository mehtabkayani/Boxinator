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

function App() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    //const accountId = localStorage.getItem('id');

  const getUser = async accountId=> {
      await axios.get('http://localhost:8080/api/user/ ' + accountId, {headers: {'Authorization': localStorage.getItem('token')}})
          .then(res => {
              console.log(res.data);
              setUserInfo(res.data);
          })
          .catch(err => {
              console.log(err);
          })
  }


    // const setAuth = boolean => {
    //     setIsAuthenticated(boolean);
    // };

useEffect(()=>{
   const isToken = localStorage.getItem('token');
   const isId = localStorage.getItem('id');
   if(isToken && isId) {
    getUser(isId)
   }
//    else{
//        setIsAuthenticated(false);
//    }
    },[])


const isAdminOrUser = () => userInfo.accountType === "ADMINISTRATOR" || userInfo.accountType === "REGISTERED_USER";
const isUser = () => userInfo.accountType === "REGISTERED_USER";
const isAdmin = () => userInfo.accountType === "ADMINISTRATOR";

return (
        <div className="App">
            
            <Router>
                <NavBar isAccountType={userInfo.accountType} setAuth={getUser} ></NavBar>
                <h1>{userInfo.accountType}</h1>
                
                
                <Switch>

                    
                    
                    <Route exact
                           path="/login"
                           render={props => {
                               if (userInfo.accountType === "ADMINISTRATOR" ) {console.log(isAdmin)
                                   return <Redirect to="/adminMainPage"/>
                               }
                               else if (userInfo.accountType === "REGISTERED_USER") {
                                   return <Redirect to="/mainPage"/>
                               }
                               else
                                return <Login{...props} getUser={getUser} />
                           }
                           }/>

                    <Route exact path="/register" render={props => {
                        if (isAdminOrUser) {
                            return <Redirect to="/userAccount"/>
                        } else {
                            return <Register/>
                        }
                    }}/>

                    <Route exact path="/userAccount" render={props => {
                        if (isAdminOrUser) {
                            return <UserAccount {...props} />
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>

                    <Route exact path="/mainPage" render={props => {
                        if (isUser) {
                            return <MainPage2 />
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/newShipment" render={props => {
                        if (isUser) {
                            return <NewShipment />
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/adminMainPage" render={props => {
                        if (isAdmin) {
                            return <AdminMainPage />
                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/country" render={props => {
                        if (isAdmin) {
                            return <CountryCost />
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>
                    <Route exact path="/allUsers" render={props => {
                        if (isAdmin) {
                            return <AllUsers />
                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>


                    <Route exact path="/addShipmentGuest" render={props => {
                        if (isAdminOrUser) {
                            return <Redirect to="/userAccount"/>
                        } else {
                            return <AddShipmentGuest />
                        }
                    }}/>
                    <Route exact path="/" render={props => {
                        if (isAdminOrUser) {
                            return <Redirect to="/userAccount" />
                        } else {
                            return <HomePage/>
                        }
                    }}/>


                    <Route path="/specificShipment"  render={props => {
                        if (isAdminOrUser) {
                            return <Redirect to="/userAccount"/>
                        } else {
                            return <SpecificShipment {...props}/>
                        }
                    }}/>
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
