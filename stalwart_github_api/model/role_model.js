const mongoose = require("mongoose")
const Schema = mongoose.Scheme
const roleSchema = new mongoose.Schema({
    RoleName : String,
   // RoleId : Number,
})
module.exports = mongoose.model("Role",roleSchema)