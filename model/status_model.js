const mongoose = require("mongoose")

const StSchema = new mongoose.Schema({
    //statusId : Number,
    statusName : String
})

module.exports = mongoose.model("Status",StSchema)