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
import UpdateUser from "./components/admin/updateUser";

function App() {

    const [userInfo, setUserInfo] = useState({});

  const getUser = async accountId=> {
    let token = localStorage.getItem('token');
      await axios.get('http://localhost:8080/api/user/ ' + accountId, {headers: {'Authorization': token}})
          .then(res => {
              console.log(res.data);
              setUserInfo(res.data);
          })
          .catch(err => {
              console.log(err);
          })
  }

useEffect(()=>{
   let token = localStorage.getItem('token');
   let id = localStorage.getItem('id');
   if(token && id) {
    getUser(id)
   }
},[])

    const clearUserInfo = () => {
        setUserInfo({});
    }
const isAdminOrUser = () => userInfo.accountType === "ADMINISTRATOR" || userInfo.accountType === "REGISTERED_USER";
const isUser = () => userInfo.accountType === "REGISTERED_USER";
const isAdmin = () => userInfo.accountType === "ADMINISTRATOR";

return (
        <div className="App">

            <Router>
                <NavBar userInfo={userInfo} clearUserInfo={clearUserInfo} isUser={isUser} isAdmin={isAdmin}></NavBar>

                <Switch>
                    <Route exact path="/login" render={props => {
                               if (userInfo.accountType === "ADMINISTRATOR") {
                                   return <Redirect to="/adminMainPage"/>
                               }
                               else if (userInfo.accountType === "REGISTERED_USER") {
                                   return <Redirect to="/mainPage"/>
                               }
                               else{
                                    return <Login{...props} getUser={getUser} />
                               }

                           }
                           }/>
                    <Route exact path="/register" render={props => {
                        if (userInfo.accountType === "ADMINISTRATOR") {
                            return <Redirect to="/adminMainPage"/>
                        } else if(userInfo.accountType === "REGISTERED_USER") {
                            return <Redirect to="/mainPage"/>
                        }else{
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

                        if (userInfo.accountType === "REGISTERED_USER") {

                            return <MainPage2 />

                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/newShipment" render={props => {

                        if (userInfo.accountType === "REGISTERED_USER") {

                            return <NewShipment />

                        } else {
                        }
                    }}/>
                    <Route exact path="/adminMainPage" render={props => {

                        if (userInfo.accountType === "ADMINISTRATOR") {

                            return <AdminMainPage />

                        } else {
                            return <Redirect to="/"/>
                        }
                    }}/>
                    <Route exact path="/country" render={props => {

                        if (userInfo.accountType === "ADMINISTRATOR") {

                            return <CountryCost />

                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>
                    <Route exact path="/allUsers" render={props => {

                        if (userInfo.accountType === "ADMINISTRATOR") {

                            return <AllUsers />

                        } else {
                            return <Redirect to="/login"/>
                        }
                    }}/>
                    <Route exact path="/addShipmentGuest" render={props => {
                         if (userInfo.accountType === "ADMINISTRATOR") {
                            return <Redirect to="/adminMainPage"/>
                        } else if(userInfo.accountType === "REGISTERED_USER") {
                            return <Redirect to="/mainPage"/>
                        }else{
                            return <AddShipmentGuest/>
                        }
                    }}/>
                    {/* <Route path="/specificShipment/:id" render={props => {
                        if (userInfo.accountType === "ADMINISTRATOR" || userInfo.accountType === "REGISTERED_USER") {
                            return <SpecificShipment />
                        } else {
                            return <Redirect to="/"/> 
                        }
                    }}/> */}
                    <Route exact path="/" render={props => {
                            if(userInfo.accountType === "ADMINISTRATOR"){
                                return <Redirect to="/adminMainPage"/>
                                }else if(userInfo.accountType === "REGISTERED_USER"){
                                return <Redirect to="/mainPage"/>
    
                                }
                            // return <Redirect to="/userAccount" />
                         else {
                            return <HomePage/>
                        }
                    }}/>



                    <Route path="/updateUser/:id" component={UpdateUser}/>
                    <Route path="/specificShipment" component={SpecificShipment}/>
                    <Route  path="/updateCountry/:id" component={ UpdateCountry }/>

                    <Route path="/specificShipment"  render={props => {
                        if (isAdminOrUser) {
                            return <Redirect to="/userAccount"/>
                        } else {
                            return <SpecificShipment {...props}/>
                        }
                    }}/>

                    
                    <Route exact path="/specificShipment/:id" component={SpecificShipment} />

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