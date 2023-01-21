const mongoose = require("mongoose")
const Schema = mongoose.Schema
const taskSchema = new mongoose.Schema({
    CompletionDate : String,
    TaskTitle : String,
    StartDate : String,
    EstimatedHour : String,
    UtilizedHour : String,
    Status :
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Status"
    },
    Module:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Module"   
    }
})
module.exports = mongoose.model("Task",taskSchema)