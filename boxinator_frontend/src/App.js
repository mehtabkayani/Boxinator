import React from 'react';
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

function App() {
  return (
    <div className="App">
      <Router>
          <NavBar></NavBar>
          <Switch>

              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/mainPage" component={MainPage} />
              <Route path="/newShipment" component={NewShipment} />
              <Route path="/userAccount" component={UserAccount} />
              <Route path="/adminMainPage" component={AdminMainPage} />
              <Route path="/addShipmentGuest" component={AddShipmentGuest} />
              <Route path="/" component={HomePage} />

          </Switch>
      </Router>
    </div>
  );
}

export default App;
