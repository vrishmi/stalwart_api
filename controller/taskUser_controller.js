const Task_model = require("../model/taskUser_model")
const taskModel =require("../model/task_model")

module.exports.addTask = function(req,res)
{
    let User = req.body.User
    let Task=req.body.Task
    let isAssign =req.body.isAssign
    console.log(req.body)

    let task = new Task_model(
        {//"taskDeveId":taskDeveId,
        "User":User,
        "Task":Task,
        "isAssign":isAssign
        }
    ) 

    task.save(function (err,data)//ProductModel is used from the first line of import(const ProductModel)
     {
        if(err)
        {
            console.log(err)
            res.json({
                msg:"Task not added",
                status:-1,
                data:"SmW"
            })
        }
        else{
            res.json({
                msg:"Task added",
                status:1,
                data:data 
            })
        }
    })
}
module.exports.getTaskUserDataByDeveloper =function(req,res)
{
    Task_model.find({User:req.params.userId},function(err,data){
        if(data){
            console.log("--->");
            console.log(data);
            let p = [] //[1,2,3,4,5]
            data.forEach(element => {
                console.log(element.Task);
                p.push(element.Task) 
            });
            
            taskModel.find({_id: { $in: p}}).populate("Module").populate("Status").exec(function(err,data){
                if(err)
                {
                    res.json({
                        msg: "ERROR",
                        status : -1,
                        data: "SOMETHING WENT WRONG"
                    })
                }
                else
                {
                    res.json({
                        msg: "TASK USER DATA RETRIVED",
                        status : 200,
                        data: data
                    }) 
                }
            })
        }
    });
}
module.exports.getAllTaskUser = function(req,res)
{
    Task_model.find({User:"6398a6d308aa4b2652351a96"}).populate("Task").exec(function(err,data){
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
                    msg : "TASK USERS",
                    status : 1,
                    data : data
                })
            }
        })
    }

module.exports.getAllTask = function(req,res)
{
    Task_model.find().populate("User").populate("Task").exec(function(err,data){
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
                msg:"Task retrieved",
                status:200,
                data:data
            })
        }
    })
}

module.exports.deleteTask = function(req,res)
{
    let taskDeveId = req.body.taskDeveId
    Task_model.deleteOne({_id:taskDeveId},function(err,data)
    {
        console.log(err);
        if(err)
        {
            res.json({
                msg:"SMW",
                status:-1,
                data:err
            })
        }
        else{
            res.json({
                msg:"Task succesfully deleted",
                status:200,
                data:data
            })
        }
    })
}

