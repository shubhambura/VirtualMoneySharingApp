const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config")

function authMiddleware(req,res,next){
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith('Bearer ')){
         return res.status(403).json({
            message:"Invalid token type"
         })
    }
    
        const token = authorization.split(' ')[1]
        try{
        const decoded = jwt.verify(token , JWT_SECRET)
        req.userId = decoded.userId
        next()
        }
       
        catch(err){
            return res.status(403).json({
                message:"Invalid token",
            })
        }

}

module.exports=authMiddleware