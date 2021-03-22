import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { actions } from "../redux/Action";
import firebase from "../firebase/Firebase";
import { Link} from "react-router-dom";



const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (user) => { dispatch(actions.saveUser(user)) }
    }
}
export default compose(
    withRouter, connect(null, mapDispatchToProps))(function SignUp(props) {

        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const { history, saveUser } = props


        const handlerSubmit = (e) => {
            e.preventDefault();
            let newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log(user)
                    axios.post("http://localhost:4000/register", newUser)
                        .then(respons => {
                            localStorage.setItem("token", respons.data.token)
                        
                            saveUser(respons.data.user);
                            history.push("/books");

                        }).catch(err => {
                            firebase.auth().signOut();
                            localStorage.clear()
                            saveUser({})
                            history.push('/sign-in')
                            alert("sign up failed")
                        })
                })
                .catch((err) => {
                    debugger
                    firebase.auth().signOut();
                    localStorage.clear()
                    saveUser({})
                    history.push('/sign-in')
                    alert(err)
                });
        };

      
        return (

            <form onSubmit={handlerSubmit} className="container col-4" >
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <div>Already have an account? <Link to={"/sign-in"}>Sign in.</Link></div>
            </form>
        );
    }
    )

