const mongoose = require("mongoose")

const moduleSchema = new mongoose.Schema({
    //module_id:Number,
    module_name:String,
    Project:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project" 
    },
    Status:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Status" 
    }
})

module.exports = mongoose.model("Module", moduleSchema)