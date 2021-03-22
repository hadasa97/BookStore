const mongoose= require('mongoose');


const bookSchema=mongoose.Schema({
    kind:{
        type:String,
        required:true
    },
    content:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // users:[
    //     {
    //          type: mongoose.Schema.Types.ObjectId,
    //          ref: 'User'
    //     } 
    //  ]
})
// bookSchema.pre('remove',async function(next){
//     console.log("pre remove");
//     await User.findByIdAndUpdate(this.userId, { $pull: { books: this._id } })
//     next()
// })
// bookSchema.post('save', function(next){
//     console.log("post save");
// })
module.exports=mongoose.model('Book',bookSchema)
