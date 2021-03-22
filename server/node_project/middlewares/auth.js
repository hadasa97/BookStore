const jwt=require('jsonwebtoken')

const checkAuth=(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        jwt.verify(token,process.env.SECRET)
        next()
    }
    catch(err){
        res.status(401).json({err: "authorization failed"})
    }
}
module.exports=checkAuth