
const projectModel = require("../model/project_model")

    module.exports.projectData = function(req,res)
    {
        let ProjectTitle=req.body.ProjectTitle
        let Technology = req.body.Technology
        let CompletionDate = req.body.CompletionDate
        let FrontEnd = req.body.FrontEnd
        let BackEnd = req.body.BackEnd
        let StartDate = req.body.StartDate
        let EstimatedHour = req.body.EstimatedHour
        let TotalUtilizedHour = req.body.TotalUtilizedHour
        let Status = req.body.Status

        console.log(req.body)

        let project = new projectModel({
            "ProjectTitle":ProjectTitle,
            "Technology" : Technology,
            "CompletionDate" : CompletionDate,
            "FrontEnd" : FrontEnd,
            "BackEnd" : BackEnd,
            "StartDate" : StartDate,
            "EstimatedHour" : EstimatedHour,
            "TotalUtilizedHour" : TotalUtilizedHour,
            "Status": req.body.Status
        })
        
        project.save(function(err, data)
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
   
    module.exports.getProjectById = function(req,res){
        let projectId = req.params.projectId
    
        projectModel.findOne({_id:projectId}).populate("Status").exec(function(err,data){
            if (err) {
                res.json({
                    status: -1,
                    msg: "SME",
                    data: err
                })
            } else {
                res.json({
                    status: 200,
                    msg: "project reterieved..",
                    data: data
                })
            }
        })
    }
    module.exports.getOngoingProjects=function(req,res){
        
        projectModel.find( 
            { 
                "Status": "6390950097d467165e42e570"
            }, function (err, data) 
            {
                if (err) {
    
                } 
                else 
                {
    
                    res.json({
                        data: data,
                        status: 200,
                        msg: "Done"
                    })
                }
            })
    }
    module.exports.getProjectByStatusId = function(req,res){
        let statusId = req.params.statusId
        projectModel.find({Status:statusId}).populate("Status").exec(function(err,data){
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
    
    module.exports.getPiplelineProjects=function(req,res){
        
        projectModel.find( 
            { 
                "Status": "6390945597d467165e42e56c"
            }, function (err, data) 
            {
                if (err) {
    
                } 
                else 
                {
    
                    res.json({
                        data: data,
                        status: 200,
                        msg: "Done"
                    })
                }
            })
    }
    module.exports.getPendingProjects=function(req,res){
        
        projectModel.find( 
            { 
                "Status": "6390950797d467165e42e572"
            }, function (err, data) 
            {
                if (err) {
    
                } 
                else 
                {
    
                    res.json({
                        data: data,
                        status: 200,
                        msg: "Done"
                    })
                }
            })
    }
    module.exports.getOverdueProjects=function(req,res){
        
        projectModel.find( 
            { 
                "Status": "6390950e97d467165e42e574"
            }, function (err, data) 
            {
                if (err) {
    
                } 
                else 
                {
    
                    res.json({
                        data: data,
                        status: 200,
                        msg: "Done"
                    })
                }
            })
    }
    module.exports.getCompletedProjects=function(req,res){
        
        projectModel.find( 
            { 
                "Status": "6390945f97d467165e42e56e"
            }, function (err, data) 
            {
                if (err) {
    
                } 
                else 
                {
    
                    res.json({
                        data: data,
                        status: 200,
                        msg: "Done"
                    })
                }
            })
    }
    module.exports.getThisMonthProjects = function (req, res) {
        let m = new Date().getMonth() + 1;
        let y = new Date().getFullYear();
    
        
        // ExpenseModel.find($AND:{ $gt:{date}  }}
        projectModel.find(
            {
    
                "$and": [
                    {
                        "$expr": {
                            "$eq": [{ $month: { $dateFromString: { "dateString": "$StartDate" } } }, m]
                        }
                    }
                    ,
                    {
                        "$expr": {
                            "$eq": [{ $year: { $dateFromString: { "dateString": "$StartDate" } } }, y]
                        }
                    }
                ]
    
            }, function (err, data) {
                if (err) {
    
                } else {
    
                    res.json({
                        data: data,
                        status: 200,
                        msg: "Done"
                    })
                }
            }
        )
    }
    
    module.exports.getAllProjectData = function(req,res)
    {
        projectModel.find().populate("Status").exec(function(err,data)
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
    module.exports.deleteProjectData = function(req,res){
        let projectId = req.params.projectId;
        projectModel.deleteOne({_id:req.params.projectId},function(err,data){
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
                    msg : "PROJECT DELETED",
                    status : 200,
                    data : data
                })
            }
        })
    }
    
    
    module.exports.updateProjectData = function(req,res)
    {
        let projectId = req.body.projectId
        let ProjectTitle = req.body.ProjectTitle
        let Technology = req.body.Technology
        let CompletionDate = req.body.CompletionDate
        let FrontEnd = req.body.FrontEnd
        let BackEnd = req.body.BackEnd
        let StartDate = req.body.StartDate
        let EstimatedHour = req.body.EstimatedHour
        let TotalUtilizedHour = req.body.TotalUtilizedHour
        let Status=req.body.Status
        
        projectModel.updateOne({_id:projectId},{
        ProjectTitle: ProjectTitle,
        Technology: Technology,
        CompletionDate : CompletionDate,
        FrontEnd : FrontEnd,
        BackEnd : BackEnd,
        StartDate : StartDate,
        EstimatedHour : EstimatedHour,
        TotalUtilizedHour : TotalUtilizedHour,
        Status:Status
        },
        function(err, data)
        {
            if(err)
            {
                res.json({
                    msg: "SOMETHING WENT WRONG",
                    status : -1,
                    data: projectId
                })
            }
            else
            {
                console.log("Data")
                res.json({
                    msg: "DATA UPDATED",
                    status : 200,
                    data: data
                }) 
            }
        })
    }


