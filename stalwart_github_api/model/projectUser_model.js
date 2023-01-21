const mongoose = require("mongoose")

const projectUserSchema = new mongoose.Schema({
    //project_user_id:Number,
    Project:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },
    User:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isAssign:Boolean
})

module.exports = mongoose.model("ProjectUser", projectUserSchema)