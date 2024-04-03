const express = require("express")
const {User , Account} = require("../db")
const router = express.Router()
const authMiddleware = require('../middleware')
const { default: mongoose } = require("mongoose")

router.get('/balance', authMiddleware ,async function(req,res){

    const userBalance = await Account.findOne({
        userId:req.userId 
    })
    res.json({
        balance: userBalance.balance
    })
})

router.post('/transfer',authMiddleware,async function(req,res){
    const session = await mongoose.startSession();

    session.startTransaction();
    const amount = req.body.amount;
    const to = req.body.to;

    const account = await Account.findOne({userId:req.userId}).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    })
})


module.exports = router