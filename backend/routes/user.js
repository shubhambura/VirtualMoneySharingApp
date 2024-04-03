const express = require("express")
const {User, Account} = require("../db")
const router = express.Router()
const zod = require("zod")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const authMiddleware = require("../middleware")


const signupSchema = zod.object({
    userName : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})


router.post("/signup" ,async function(req,res){
   const body = req.body;
   const validation = signupSchema.safeParse(body)

    const existingUser = await User.findOne({userName:body.userName})

    if(validation.success && !existingUser){
        const user = await User.create({
            userName : body.userName,
            firstName : body.firstName,
            lastName : body.lastName,
            password : body.password
        })

        const userId = user._id
        await Account.create({
            userId:userId,
            balance: 1 + Math.random() * 10000
        })



        const token = jwt.sign({userId} , JWT_SECRET)

        res.status(200).json({
            message: "User crated successfully",
            token : token
        })
   }

   else{
    res.status(411).json({
        message:"Email already taken / Incorrect inputs"
    })
   }
   
})


router.post("/signin", async function(req,res){
    const body = req.body
    const existingUser = await User.findOne({userName:body.userName,password:body.password})

    if(existingUser){
    const token = jwt.sign({ userId : existingUser._id} , JWT_SECRET)
    res.status(200).json({
        token: token
    })
    }

    else{
        res.status(411).json({
            message:"Error while logging in"
        })
    }

})

const updateSchema = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    password : zod.string().min(6).optional()
})

router.put("/"  ,async function(req,res){
   
    const validate = updateSchema.safeParse(req.body)
    if(!validate.success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }
    else{
        await User.updateOne({ _id:req.userId}, req.body)
        res.status(200).json({
            message:"Updated successfully"
        })
    }
})

router.get("/bulk"  ,async function(req,res){
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        users: users.map(function(user){
        return{
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id:user._id
        }
        })
    })


})

module.exports=router
