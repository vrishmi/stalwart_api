const taskModel = require("../model/task_model")
module.exports.taskData = function(req,res)
{
   
    let TaskTitle = req.body.TaskTitle
    let StartDate = req.body.StartDate
    let CompletionDate = req.body.CompletionDate
    let EstimatedHour = req.body.EstimatedHour
    let UtilizedHour = req.body.UtilizedHour
    let Status = req.body.Status
    let Module=req.body.Module

    console.log(req.body)

    let Task = new taskModel({
        "TaskTitle" : TaskTitle,
        "StartDate" : StartDate,
        "CompletionDate" : CompletionDate,
        "EstimatedHour" : EstimatedHour,
        "UtilizedHour" : UtilizedHour,
        "Status" : req.body.Status,
        "Module" :req.body.Module
    })
    
    Task.save(function(err, data)
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

module.exports.getAllTaskData = function(req,res)
{
    taskModel.find().populate("Status").populate("Module").exec(function(err,data)
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
module.exports.getTaskByModuelId = function(req,res){
    let moduleId = req.params.moduleId
    taskModel.find({Module:moduleId}).populate("Module").populate("Status").exec(function(err,data){
        
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
                msg : "TASKS",
                status : 1,
                data : data
            })
        }
    })
}
module.exports.getTaskById = function(req,res){
    let taskId = req.params.taskId;

    taskModel.findOne({_id:taskId}).populate("Status").populate("Module").exec(function(err,data){
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: "SOMETHING WENT WRONG"
            })
        } else {
            res.json({
                status: 200,
                msg: "Task Retrieved..",
                data: data
            })
            console.log(data)
        }
    })
}
    
module.exports.deleteTaskData = function(req,res)
{ 
    let taskId = req.params.taskId;

    taskModel.deleteOne({_id:req.params.taskId}, function(err,data)
    {
        console.log(err)
        if(err)
        {
            res.json({
                msg: "SOMETHING WENT WRONG",
                status : -1,
                data: err
            })
        }
        else
        {
            res.json({
                msg: "TASK DELETED",
                status : 200,
                data: data
            }) 
        }
    })
}

module.exports.updateTaskData = function(req,res)
{
    let taskId = req.body.taskId
    let TaskTitle = req.body.TaskTitle
    let StartDate = req.body.StartDate
    let CompletionDate = req.body.CompletionDate
    let EstimatedHour = req.body.EstimatedHour
    let UtilizedHour = req.body.UtilizedHour
    let Status = req.body.Status
    let Module=req.body.Module
   
    taskModel.updateOne({_id:taskId},{

        TaskTitle : TaskTitle,
        StartDate : StartDate,
        CompletionDate : CompletionDate,
        EstimatedHour : EstimatedHour,
        UtilizedHour : UtilizedHour,
        Status : Status,
        Module : Module
    }, 
    function(err, data)
    {   console.log(data)
        if(err)
        {
            res.json({
                msg: "SOMETHING WENT WRONG",
                status : -1,
                data: taskId
            })
        }
        else
        {
            res.json({
                msg: "TASK UPDATED",
                status : 200,
                data: data
            }) 
        }
    })
}
