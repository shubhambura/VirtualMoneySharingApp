const mongoose = require("mongoose")
const { number } = require("zod")

mongoose.connect("mongodb+srv://admin:asdfghjkl123@cluster0.cqf2bks.mongodb.net/upiWallet")

const  UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
        password:{
        type:String,
        required:true,
        minLength:6,
    },
        userName:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
            minLength:3,
            maxLength:30
    },
        lastName:{
            type:String,
            required:true,
            trim:true,
            maxLength:50
        }
})

const acountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        res: 'User',
        required: true
    },
    balance:{
        type:Number,
        required: true
    }
})

 const User = mongoose.model( "User",UserSchema )
 const Account = mongoose.model("Account", acountSchema)

 module.exports = {
    User,
    Account
 }
