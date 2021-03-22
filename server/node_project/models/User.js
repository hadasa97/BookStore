const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
   lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    books:[
       {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
       } 
    ]
})

module.exports=mongoose.model('User',userSchema)