import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { BsPencil } from "react-icons/bs";
// import { IoIosBrush } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
// import { Alert } from 'antd';
import Alert from 'react-bootstrap/Alert';
// import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
// import { MDBContainer, MDBAlert } from 'mdbreact';
import {Button} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
// import 'react-snackbar-alert/styles/react-snackbar-alert.css';

function mapStateToProps(state) {

    return {
        _id: state.userReducer.user._id,
        firstName: state.userReducer.user.firstName,
        lastName: state.userReducer.user.lastName,
    }
}

export default connect(mapStateToProps)(function UserBooks(props) {
    const { _id } = props;
    const [books, setBooks] = useState([])
    let updateKind = useRef(null);
    let updateContent = useRef(null);
    let history = useHistory();
    const [showDialog, setShowDialog] = React.useState(false);
    const [book, setBook] = useState("")
   
    const open = (book) => {
        setShowDialog(true)
        setBook(book)
    };
    const close = () => setShowDialog(false);

    useEffect(() => {
        getBooksByUserId()
    }, [])

    function getBooksByUserId(){
    axios.get(`http://localhost:4000/getBooksByUserId/${_id}`, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`
        }
    }).then(res => {
        setBooks(res.data);
        console.log(res.data)
    }).catch(err => {
        alert(err + " Please login again")
        history.push('/sign-in')
    })
}
    function deleteBook(bookId) {
        axios.delete(`http://localhost:4000/deleteBook/${bookId}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }

        }).then(res => {
          
            // <Snackbar
            
            //   open={opens}
            //   onClose={handleClose}
            //   message="I love snacks"
             
            // />
            // setBooks(res.data);
           
            <Snackbar open={open}>
         <Alert severity="error">This is an error message!</Alert></Snackbar>
         alert(res.data);
{/* <Alert variant="success">
  <Alert.Heading>nice to see you</Alert.Heading>
  <p>
 {res.data}
  </p>
</Alert> */}
{/* <MDBAlert color="primary" >
A simple primary alert—check it out!
</MDBAlert> */}
{/* <MDBContainer>
<MDBAlert color="warning" dismiss>
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
</MDBAlert>
<MDBAlert color="warning" >
        A simple warning alert—check it out!
      </MDBAlert>
</MDBContainer> */}

            // setBooks(books.filter(b => b._id !== bookId))
            getBooksByUserId()

        }).catch(err => {
            alert(err)
        })
    }

    function updateBook(bookId) {

        const myBook = {
            _id: bookId,
            kind: updateKind.current.value,
            content: updateContent.current.value
        }
        debugger
        axios.patch(`http://localhost:4000/updateBook/${bookId}`, myBook,{
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }

        }).then(res => {
            close()
            alert(res.data);
            getBooksByUserId()


        }).catch(err => {
            alert(err)
        })
    }
    return (
        <>
            <div style={{ width: "50%", marginLeft: "25%" }}>
                <Link className="nav-link" to={"/books"}>go back to buy books</Link>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr >
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Kind</th>
                            <th>Content</th>

                        </tr>
                    </thead>
                    <tbody>
                        {books.map((b, i) => (
                            <tr key={i} style={{backgroundColor: i%2?"#7EBEF2":"#F9C364"}}>
                                <td>  <button onClick={() => deleteBook(b._id)}>
                                    <DeleteForeverTwoToneIcon />
                                </button></td>
                                <td>
                                    <button onClick={() => open(b)}>
                                        < BsPencil /></button>
                                </td>
                                <td>{b.kind}</td>
                                <td>{b.content}</td>
                                {/* <td>{book._id}</td> */}

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Dialog isOpen={showDialog} onDismiss={close}>
                 <button className="close-button" onClick={close}>
                    <span aria-hidden>×</span>
                </button>
            <div className="form-group">
                <div><input type="text" placeholder="kind" className="form-control" ref={updateKind} defaultValue={book.kind}/></div>
                <div><input type="text" placeholder="content" className="form-control"ref={updateContent} defaultValue={book.content}/></div>
               </div>
                <Button variant="outline-warning" onClick={() => updateBook(book._id)}>update the book</Button>

            </Dialog>
            
        </>
    );
}
)