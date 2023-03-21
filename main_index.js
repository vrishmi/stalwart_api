const express = require("express")
const app = express()
const cors = require("cors")
const status_controller = require("./controller/status_controller")
const taskUser_controller = require("./controller/taskUser_controller")
const user_controller = require("./controller/user_controller")
const task_controller=require("./controller/task_controller")
const role_controller = require("./controller/role_controller")
const project_controller = require("./controller/project_controller")
const module_controller = require("./controller/module_controller")
const projectUser_controller = require("./controller/projectUser_controller")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/royaldb",function(err,data){
    if(err){
        console.log("SMW")
        console.log(err);
    }
    else{
        console.log("Starlwart db connected..")
    }
})

app.post("/status",status_controller.addStatus)
app.delete("/dstatus/:statusId",status_controller.deleteStatus)
app.put("/ustatus",status_controller.updateStatus)
app.get("/getstatus",status_controller.getAllStatus)
app.get("/getstatusbyid/:statusId",status_controller.getStatusById)

app.post("/addtaskUser",taskUser_controller.addTask)
app.delete("/taskUser",taskUser_controller.deleteTask)
app.get("/taskUser",taskUser_controller.getAllTask)
app.get("/gettaskusers/:userId",taskUser_controller.getTaskUserDataByDeveloper)

app.post("/user",user_controller.add_users)
app.post("/login",user_controller.login)
app.get("/userg",user_controller.getAllUsers)
app.delete("/userd/:userId",user_controller.deleteUser)
app.put("/useru",user_controller.updateUser)
app.post("/forgetPass",user_controller.forgetPassword)
app.post("/updatePass",user_controller.updatePassword)
app.post("/resetPass",user_controller.resetPassword)
app.get("/getuserbyid/:userId",user_controller.getUserById)
app.get("/getpmusers",user_controller.getAllPmUsers)
app.get("/gettaskusers",user_controller.getAllTaskUsers)

app.post("/task",task_controller.taskData) 
app.get("/gettask",task_controller.getAllTaskData)
app.delete("/dtask/:taskId",task_controller.deleteTaskData)
app.put("/utask",task_controller.updateTaskData)
app.get("/gettaskbyid/:taskId",task_controller.getTaskById)
app.get("/gettaskbymoduleid/:moduleId",task_controller.getTaskByModuelId)

app.post("/role",role_controller.addData)
app.get("/getrole",role_controller.getAllData)
app.delete("/role",role_controller.deleteData)
app.put("/role",role_controller.updateData)

app.post("/addproject",project_controller.projectData)
app.get("/getproject",project_controller.getAllProjectData)
app.delete("/dproject/:projectId",project_controller.deleteProjectData)
app.put("/uproject",project_controller.updateProjectData) 
app.get("/getprojectbyid/:projectId",project_controller.getProjectById)
app.get("/getthismonthproject",project_controller.getThisMonthProjects)
app.get("/getongoingprojects",project_controller.getOngoingProjects)
app.get("/getpipelineprojects",project_controller.getPiplelineProjects)
app.get("/getcompletedprojects",project_controller.getCompletedProjects)
app.get("/getoverdueprojects",project_controller.getOverdueProjects)
app.get("/getprojectbystatusid/:statusId",project_controller.getProjectByStatusId)

app.post("/module",module_controller.addModule)
app.get("/getmodule",module_controller.getAllModules)
app.get("/getmodulebyprojectid/:projectId",module_controller.getModuleByProjectId)
app.get("/getmodulebyid/:moduleId",module_controller.getModuleById)
app.delete("/dmodule/:moduleId",module_controller.deleteModule)
app.put("/umodule",module_controller.updateModule) 

app.post("/addprojectUser",projectUser_controller.add_projectUsers)
app.get("/projectUser",projectUser_controller.getAllProjectUsers)
app.delete("/projectUser",projectUser_controller.deleteProjectUser)
app.put("/projectUser",projectUser_controller.updateProjectUser)
app.get("/getprojectUser",projectUser_controller.getProjectUserData)
app.get("/getprojectuserbystatusid/:userId/:statusId",projectUser_controller.getProjectUserDataByStatusid)
app.get("/getprojectUserBypm/:userId",projectUser_controller.getProjectUserDataByPm)


app.listen(9091,function(err)
{
    if(err){
        console.log("Server not connected")
    }
    else{
        console.log("Server started on 9091")
    }
})