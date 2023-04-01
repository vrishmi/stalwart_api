const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    gender:String,
    dob:Number,
    joindate:Number,
    token1:String,
    Role:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    otp:Number,
    wrong_attept_count:Number,
    isLock:Boolean
     
})

module.exports = mongoose.model("User", userSchema)