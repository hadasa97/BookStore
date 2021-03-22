import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from "../src/firebase/Firebase";
import Login from "./components/Login";
import logo from './logo.png'
import Books from "./components/Books";

import LogOut from './components/LogOut';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import store from "./redux/Store";
import { Provider } from 'react-redux'
import SignUp from './components/Signup'
import UserName from './components/UserName'
import UserBooks from './components/UserBooks'
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((_authenticated) => {
      setAuthenticated(_authenticated ? true : false)

    });
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <div className="App">

          <nav  className="navbar navbar-expand-lg navbar-light fixed-top " style={{ marginBottom: "0px" }} justify variant="tabs">
            <div className="container">
              {/* <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link> */}
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                {authenticated ? <>

                  <ul className="navbar-nav ">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/userBooks"}>my books</Link>
                    </li>
              
                
                    
                   
                
                    {/* <li className="nav-item">
                      <img src={logo} className="logo "></img>
                    </li> */}
                  </ul>
                  <UserName className=" nav-item " style={{direction:"rtl"}}/>
              <LogOut className="nav-item " style={{direction:"rtl"}} />
                </> : <>
                  <ul className="navbar-nav  ">

                    <li className="nav-item ">
                      <Link className="nav-link" authenticated={authenticated} to={"/sign-in"}>Sign In</Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link" authenticated={authenticated} to={"/sign-up"}>Sign Up</Link>
                    </li>
                    {/* <li className="nav-item "></li> */}
                  
                      {/* <img src={logo} className="logo" style={{direction:"rtl"}}></img> */}
                   
                  </ul>

                </>}
             
              </div>
            
             
              <img src={logo} className="logo" style={{direction:"rtl"}} ></img>
            </div>

          </nav>

          <div className="auth-wrapper">

            <Switch>
              <Route exact path='/' component={SignUp} />
              <Route path="/sign-in" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/userBooks" component={UserBooks} />
              <Route path="/books" render={(props) => (authenticated ? <Books {...props} /> : <Redirect to="/sign-in" />)} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>


      </Router>
    </Provider>
  );
}

export default App;
