import React from 'react';
// import { Button } from 'react-bootstrap/Button';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { compose } from "redux";
import { actions } from "../redux/Action";

const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (user) => { dispatch(actions.saveUser(user)) }
    }
}

export default compose(
    withRouter, connect(null, mapDispatchToProps))(function LogOut(props) {
    const { history ,saveUser} = (props)
    const logOut = () => {
        firebase.auth().signOut();
        localStorage.clear()
        saveUser({})
        history.push('/sign-in')
    };
    return( <>
 <DropdownButton id="dropdown-basic-button" variant="outline-secondary">
  <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
</DropdownButton>
</>)
})