const router=require('express').Router();
const user = require('../controllers/user')
const book = require('../controllers/book')
const admin=require("firebase-admin")
const checkOutByFirbase=require("../middlewares/authByFirebase.json");
const checkAuth=require('../middlewares/auth')

admin.initializeApp({
    credential:admin.credential.cert(checkOutByFirbase),
    databaseURL:"https://booksproject-866a1.firebaseapp.com"
});

function checkFirebase(req,res,next){
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        admin.auth().verifyIdToken(req.headers.authorization)
        .then((data)=>{
            next()
        }).catch((err)=>{
            res.status(403).send('Unauthorized')
        })
    }
    else{
        res.status(403).send('Unauthorized')
    }
}

router.get('/login/:email/:password',user.login)
router.post('/register',user.register)

router.post('/newBook',checkAuth,book.newBook)
router.get('/getBooksByUserId/:id',checkAuth,book.getBooksByUserId)
router.delete('/deleteBook/:bookId',checkAuth,book.deleteBook)
router.patch('/updateBook/:bookId',checkAuth,book.updateBook);
module.exports=router