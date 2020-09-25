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

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

  return (
    <div className="App">
      <Router>
          <NavBar></NavBar>
          <Switch>

              <Route exact
                     path="/login"
                     render={props =>
                         !isAuthenticated ? (
                             <Login{...props} setAuth={setAuth} />
                         ) : (
                             <Redirect to="/mainPage" />
                         )
                     } />

              <Route path="/register" component={Register} />
              <Route path="/mainPage" component={MainPage2} />
              <Route path="/newShipment" component={NewShipment} />
              <Route path="/userAccount" component={UserAccount} />
              <Route path="/adminMainPage" component={AdminMainPage} />
              <Route path="/addShipmentGuest" component={AddShipmentGuest} />
              <Route path="/country" component={CountryCost} />
              <Route path="/allUsers" component={AllUsers} />
              <Route path="/" component={HomePage} />

          </Switch>

      </Router>
    </div>
  );
}

export default App;
