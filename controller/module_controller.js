const moduleModel = require("../model/module_model")

module.exports.addModule = function(req,res){
    //let module_id = req.body.module_id
    let module_name = req.body.module_name
    let Project = req.body.Project
    let Status = req.body.Status

    let module1 = new moduleModel(
        {
            "module_name" : module_name,
            "Project" : Project,
            "Status" : Status
        }
    )

    module1.save(function(err,data){
        if(err){
            console.log(err)
            res.json({
                msg : "MODULE NOT ADDED",
                status : -1,
                data : "SOMETHING WENT WRONG"
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "MODULE ADDED",
                status : 200,
                data : data
            })
        }
    })
}

module.exports.getModuleByProjectId = function(req,res){
    let projectId = req.params.projectId
    moduleModel.find({Project:projectId}).populate("Project").populate("Status").exec(function(err,data){
        console.log(err);
        if(err){
            console.log(err)
            res.json({
                msg : "SOMETHING WENT WRONG",
                status : -1,
                data : err
            })
        }
        else{
            console.log(data)
            res.json({
                msg : "MODULES",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.getAllModules = function(req,res){
    moduleModel.find().populate("Project").populate("Status").exec(function(err,data){
        console.log(err);
        if(err){
            console.log(err)
            res.json({
                msg : "SOMETHING WENT WRONG",
                status : -1,
                data : err
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "MODULES",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.deleteModule = function(req,res){
    let moduleId = req.params.ModuleId;
    moduleModel.deleteOne({_id:req.params.moduleId},function(err,data){
        console.log(err);
        if(err){
            console.log(err)
            res.json({
                msg : "SOMETHING WENT WRONG",
                status : -1,
                data : err
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "MODULE DELETED",
                status : 200,
                data : data
            })
        }
    })
}

module.exports.updateModule = function(req,res){
    let moduleId = req.body.moduleId
    let module_name = req.body.module_name 
    let Status=req.body.Status
    let Project=req.body.Project

    moduleModel.updateOne({_id:moduleId},{
        module_name : module_name,
        Status : Status,
        Project : Project
        
    },function(err,data){
        console.log(err);
        if(err){
            console.log(err)
            res.json({
                msg : "SOMETHING WENT WRONG",
                status : -1,
                data : moduleId
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "MODULE UPDATED",
                status : 200,
                data : data
            })
        }
    })

}

module.exports.getModuleById = function(req,res){
    let moduleId = req.params.moduleId

    moduleModel.findOne({_id:moduleId}).populate("Status").populate("Project").exec(function(err,data){
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "Module Retrieved..",
                data: data
            })
        }
    })
}