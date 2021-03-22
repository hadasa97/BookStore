const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')
const dotnev=require('dotenv')
dotnev.config()
const mongoose=require('mongoose')
const bodyParser=require("body-parser")
const admin=require("firebase-admin")
const router=require('./routes/route')

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error: "+err);
})

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, authorization, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
// app.use('*', cors());
app.use(bodyParser.json())
app.use((req,res,next)=>{
    console.log((req.body))
    console.log( req.method);
    next();
})

app.use('/',router)

    app.use((req,res,next)=>{
        res.status(404).send('page not found')})


app.listen(4000)