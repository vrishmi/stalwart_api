const roleModel = require("../model/role_model")
module.exports.addData = function(req,res)
{
   // let RoleId = req.body.RoleId
    let RoleName = req.body.RoleName

    console.log(req.body)

    let roleData = new roleModel({
     //   "RoleId": RoleId,
        "RoleName": RoleName
    })
    
    roleData.save(function(err, data)
    {
        if(err)
        {
            console.log(err)
            res.json({
                msg: "DATA NOT ADDED",
                status : -1,
                data: "SOMETHING WENT WRONG"
            })
        }
        else
        {
            res.json({
                msg: "DATA ADDED",
                status : 200,
                data: data
            }) 
        }
    })
}

module.exports.getAllData = function(req,res)
{
    roleModel.find(function(err,data)
    {
        console.log(err)
        if(err)
        {
            res.json({
                msg: "DATA NOT ADDED",
                status : -1,
                data: "SOMETHING WENT WRONG"
            })
        }
        else
        {
            res.json({
                msg: "DATA RETRIVED",
                status : 200,
                data: data
            }) 
        }
    })
}

module.exports.deleteData = function(req,res)
{
    let roleId = req.body.roleId
    roleModel.deleteOne({_id:roleId}, function(err,data)
    {
        console.log(err)
        if(err)
        {
            res.json({
                msg: "DATA REMOVED",
                status : -1,
                data: roleId
            })
        }
        else
        {
            res.json({
                msg: "DATA RETRIVED",
                status : 200,
                data: data
            }) 
        }
    })
}

module.exports.updateData = function(req,res)
{
    let RoleName = req.body.RoleName
    let roleId = req.body.roleId
   
    roleModel.updateOne({_id:roleId}, {RoleName:RoleName}, function(err, data)
    {console.log(err)
        if(err)
        {
            res.json({
                msg: "SOMETHING WENT WRONG",
                status : -1,
                data: roleId
            })
        }
        else
        {
            res.json({
                msg: "DATA UPDATED",
                status : 200,
                data: data
            }) 
        }
    })
}

