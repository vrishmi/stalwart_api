const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    
    User :
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    } ,
    Task :
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },
    isAssign :
    {
        type:mongoose.Schema.Types.Boolean,
        required:true
    }

})

module.exports = mongoose.model("TaskUser",TaskSchema)//Task 