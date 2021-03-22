const Book = require('../models/Book')
const User = require('../models/User')

const newBook=async(req,res)=>{
      let book=new Book(req.body);
    try{
        await book.save()
        let user=await User.findById(req.body.userId)
        user.books.push(book._id)
        await user.save()
        res.status(200).json("the book add to your shopping cart")
    }
    catch(err){
res.status(500).json({"err":err.message})
    }
}

const getBooksByUserId=async(req,res)=>{
    try
    {
    let userBooks = await User.findById(req.params.id).populate("books")
    
    res.status(200).json(userBooks.books)
    }
    catch(err){
    res.status(500).json(err)
    }
    
    
}

const deleteBook= async (req, res) => {
    try {
      let book = await Book.findById(req.params.bookId);
     console.log(book)
      await User.findByIdAndUpdate(book.userId, {
        $pull: { books: book._id }
      }).then(u => {
        u.save();
      });
      await Book.deleteOne(book);
      return res.status(200).send("book deleted!" );
    } catch (error) {
      return res.status(500).json(error);
    }
  };

const updateBook=async(req,res)=>{
    try{
        await Book.findByIdAndUpdate(req.params.bookId,req.body);
        res.status(200).send("the book is updated");
    }
    catch(error){
        res.status(500).json({"error":error.message})
    }   
}
module.exports={newBook,getBooksByUserId,deleteBook,updateBook}