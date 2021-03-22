import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import imgBook from '../img.png'
import { Button} from 'react-bootstrap';

function mapStateToProps(state) {
    return {
        _id: state.userReducer.user._id,
        email: state.userReducer.user.email,
        password: state.userReducer.user.password,
    }
}

export default connect(mapStateToProps)(function Books(props) {
    const { _id } = props
    const [books, setBooks] = useState([{}]);
    const [showDialog, setShowDialog] = React.useState(false);

    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    let addKind = useRef(null);
    let addContent = useRef(null);

    useEffect(() => {

        axios.get("https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyD6H_-FNhgsAtEGShfEPryHf50kZ90hUjc")
            .then(res => {

                console.log(res.data)
                setBooks(res.data.items)
                debugger
                console.log(res.data.items)
                console.log(books)
                // debugger
            }).catch(err => {
                alert(err)
            })

    }, [])

    function saveBook(book) {
        debugger
        const newBook = {
            kind:book.kind,
            content: book.etag?book.etag:book.content,
            userId: _id
        }

        axios.post("http://localhost:4000/newBook", newBook,
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                alert(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);

            })
    }

    function save() {
           const newBook = {
           kind: addKind.current.value,
           content:addContent.current.value
        }
        close()
        saveBook(newBook)
    }

  
    return (<>
    <Button variant="outline-primary" onClick={open}>add new book</Button>
        <div className="container" style={{ height: '300px' }}>
            <div className="row">
                {books.map((book, i) => (


                    <div key={i} className="col-3" >


                        {/* <button className="btn btn-outline-success" onClick={() => saveBook(book)}>buy the book</button> */}
                        {/* <button className="btn btn-outline-success" onClick={() => deleteBook(book.etag)}>delete the book</button> */}
                        <div className="card m-3" >
                        <img className="card-img-top" src={imgBook} alt="Card image cap" className="imgBook"/>
                            <div className="card-body ">
                                <h6 className="card-title">Kind: {book.kind}</h6>
                                <p className="card-title">Content: {book.etag}</p>
                                {/* <h5 className="card-title">{book.volumeInfo.title}</h5> */}

                                <Button variant="outline-warning" onClick={() => saveBook(book)} className="card-title">buy the book</Button> 

                            </div>

                        
                        </div>



                    </div>

                ))}

            </div>
        </div>

        <div>

            {/* {book.volumeInfo.title}
              {book.volumeInfo.authors[0]}
              {book.volumeInfo.language}
              {book.volumeInfo.categories[0]} */}
         
            <Dialog isOpen={showDialog} onDismiss={close}> 
            <div ><button className="close-button" onClick={close} style={{direction:"rtl"}}>
                     <span aria-hidden>×</span>
                </button></div>
                <div className="form-group">
                <div><input type="text" placeholder="kind" ref={addKind} className="form-control"/></div>
                <div><input type="text" placeholder="content" ref={addContent} className="form-control"/></div>
               </div>
                <Button variant="outline-warning" onClick={() => save()}>buy the book</Button>

            </Dialog>
        </div>
    </>)
})




