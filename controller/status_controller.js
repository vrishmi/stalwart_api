const Status_model = require("../model/status_model")

module.exports.addStatus = function(req,res)
{
    //let statusId = req.body.statusId
    let statusName = req.body.statusName
    console.log(req.body)

    let status = new Status_model(
        {
        "statusName":statusName}
    ) 

    status.save(function (err,data)//ProductModel is used from the first line of import(const ProductModel)
     {
        if(err)
        {
            console.log(err)
            res.json({
                msg:"Status not added",
                status:-1,
                data:"SmW"
            })
        }
        else{
            res.json({
                msg:"Status added",
                status:200,
                data:data 
            })
        }
    })
} 

module.exports.getAllStatus = function(req,res)
    {
        Status_model.find(function(err,data)
        {
            console.log(err);
            if(err){
                res.json({
                    msg:"SMW",
                    status:-1,
                    data:err
                })
            }
            else{
                res.json({
                    msg:"Status retrieved",
                    status:200,
                    data:data
                })
            }
        })
}
    
module.exports.deleteStatus = function(req,res)
{
    let statusId = req.params.statusId
    Status_model.deleteOne({_id:req.params.statusId},function(err,data){

        console.log(err);
        if(err){
            res.json({
                msg:"SMW",
                status:-1,
                data:statusId
            })
        }
        else{
            res.json({
                msg:"Status succesfully deleted",
                status:200,
                data:data
            })
        }
    })
}

module.exports.getStatusById = function(req,res){
    let statusId = req.params.statusId

    Status_model.findOne({_id:statusId}).exec(function(err,data){
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "Status Retrieved..",
                data: data
            })
        }
    })
}

module.exports.updateStatus = function(req,res)
{
    let statusId=req.body.statusId
    let statusName= req.body.statusName

    Status_model.updateOne({_id:statusId},{statusName:statusName},function(err,data)
    {
        console.log(err);
        if(err){
            res.json({
                msg:"SMW",
                status:-1,
                data :statusId
            })
        }
        else{
            res.json({
                msg:"Status updated",
                status:200,
                data:data
            })
        }
        
    })
}
