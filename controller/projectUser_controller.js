const projectUsersModel = require("../model/projectUser_model")
const project_model = require("../model/project_model")

module.exports.add_projectUsers = function(req,res){

    let User = req.body.User
    let Project = req.body.Project
    let isAssign = req.body.isAssign

    let project_users = new projectUsersModel(
        {
            "Project":Project,
            "User" :User,
            "isAssign" : isAssign
        }
    )

    project_users.save(function(err,data){
        if(err){
            console.log(err)
            res.json({
                msg : "PROJECT USER NOT ADDED",
                status : -1,
                data : "SOMETHING WENT WRONG"
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "PROJECT USER ADDED",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.getProjectUserData =function(req,res)
{
    projectUsersModel.find({User:"62eb8e9c91cf048a78738ec5"},function(err,data){
        if(data){
            console.log("--->");
            console.log(data);
            let p = [] //[1,2,3,4,5]
            data.forEach(element => {
                console.log(element.Project);
                p.push(element.Project) 
            });
            
            project_model.find({_id: { $in: p}}).populate("Status").exec(function(err,data){
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
                        msg: "PROJECT USER DATA RETRIVED",
                        status : 200,
                        data: data
                    }) 
                }
            })
        }
    });
}

module.exports.getProjectUserDataByPm =function(req,res)
{
    projectUsersModel.find({User:req.params.userId},function(err,data){
        if(data){
            console.log("--->");
            console.log(data);
            let p = [] //[1,2,3,4,5]
            data.forEach(element => {
                console.log(element.Project);
                p.push(element.Project) 
            });
            
            project_model.find({_id: { $in: p}}).populate("Status").exec(function(err,data){
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
                        msg: "PROJECT USER DATA RETRIVED",
                        status : 200,
                        data: data
                    }) 
                }
            })
        }
    });
}
module.exports.getAllProjectUsers = function(req,res){
    projectUsersModel.find().populate("User").populate("Project").exec(function(err,data){
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
                msg : "PROJECT USERS",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.deleteProjectUser = function(req,res){

    let project_user_id = req.body.project_user_id 
    moduleModel.deleteOne({_id:project_user_id},function(err,data){
        console.log(err);
        if(err){
            console.log(err)
            res.json({
                msg : "SOMETHING WENT WRONG",
                status : -1,
                data : project_user_id
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "PROJECT USER REMOVED",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.updateProjectUser = function(req,res){
    let project_user_id = req.body.project_user_id
    //let project_name = req.body.project_name
   // let user_id = req.body.user_id
    let isAssign = req.body.isAssign

    ProductModel.updateOne({isAssign:isAssign},function(err,data){
        console.log(err);
        if(err){
            console.log(err)
            res.json({
                msg : "SOMETHING WENT WRONG",
                status : -1,
                data : project_user_id
            })
        }
        else{
            console.log(err)
            res.json({
                msg : "PROJECT USER UPDATED",
                status : 1,
                data : data
            })
        }
    })

}

module.exports.getProjectUserDataByStatusid =function(req,res)
{ 
    projectUsersModel.find({User:req.params.userId},function(err,data){
        if(data){
            console.log("--->");
            console.log(data);
            let p = [] //[1,2,3,4,5]
            data.forEach(element => {
                console.log(element.Project);
                p.push(element.Project) 
            });
            let statusId = req.params.statusId
            project_model.find( 
            {
                    "$and": [{ _id: { $in: p}},{Status:statusId} ]}).populate("Status").exec(function(err,data){
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
                        msg: "PROJECT USER DATA RETRIVED",
                        status : 200,
                        data: data
                    }) 
                }
            })
        }
    });
}
