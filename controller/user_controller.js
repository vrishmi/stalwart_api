
const user_model = require("../model/user_model")
const nodemailer = require("nodemailer")

module.exports.forgetPassword=async function(req,res)
{
    let email = req.body.email 
    let isCorrect = false;
    let  otp = parseInt(Math.random()*1000000);
    //authenticate 
    
    let transporter = await nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'dummypatel23@gmail.com',
            pass: 'yvmxrxddrkpxxdgs'
        },
      });

    let info =await transporter.sendMail({
        from: '"Stalwart Managers " <stalwartmanagers@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello User", // Subject line
        text: "Hello User Check Your otp", // plain text body //not required
        html: `<b>Your OTP is:${otp} (Don't Share it with anyone)</b>`, // html body
    });

    user_model.findOne({"email":email},function(err,user){
        if(err){
            console.log("Error"+err)
            
        }else{

            if(user == null || user == undefined ){
                res.json({
                    data:req.body,
                    msg:"Invalid Email",
                    status:-1
                })
            }
            else
            {
                user_model.updateOne({"email":email},{"otp":otp},function(err,data)
                {
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                        console.log(data)
                    }
                })
                res.json({
                    data:"Please Check Your email",
                    msg:"Otp sent to your email",
                    status:200
                })
            }
        }
    })
    
    /*let email=req.body.email
    user_model.findOne({
        "email":email
    },function(err,data){
        if(err)
        {
            res.json({
                "status":-1,
                "data":err,  
                "msg":"Something went wrong"
            })
        }
        else{
            //console.log(data);
            
                //otp generate
            let otp=parseInt((Math.random()*10000));
            user_model.updateOne({"email":email},{"otp":otp},function(err,data){
            console.log("Update one");
            console.log(err);
            console.log(data);

            })
            
            if(data)
            {
                res.json({
                    status : 200,
                    data : email,
                    msg : "OTP SUCCESSFULY SENT",
                })
            }
            else{
                res.json({
                    status : -1,
                    data : email,
                    msg : "Invalid email",
                })
            }
           
        }
    })*/
}
//update password
module.exports.updatePassword=function(req,res)
{
    let email =req.body.email;
    let password= req.body.password;
    let otp=req.body.otp;
    user_model.findOne({"email":email},function(err,data){
        if(data)
        {
            if(data.otp==otp)
            {
                user_model.updateOne({"email":email},{"password":password},function(err,data){
                console.log("Password modified..");
                res.json({
                    status:200,
                    data:email,
                    msg:"Password modified"
                })
            })
            }
            else{
                res.json({
                    status:-1,
                    data:req.body,
                    msg:"Invalid otp"
                })
                
            }
            
        }
    })
}

module.exports.resetPassword=function(req,res)
{
    let email=req.body.email;
    let password=req.body.password;
    let otp=req.body.otp;
    let isCorrect=false;

    user_model.findOne({"email":email},function(err,user)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(user==null || user==undefined)
            {
                res.json({
                    data:req.body,
                    msg:"Invalid data",
                    status:-1
                })
            }
            else
            {
                if(user.otp==otp)
                {
                    user_model.updateOne({"email":email},{"password":password,"otp":""},function(err,data)
                    {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {
                            res.json({
                                data:"User Modified",
                                msg:"Password reset successful",
                                status:200
                            })
                        }
                    })
                }
                else
                {
                    res.json({
                        data:req.body,
                        msg:"Invalid otp",
                        status:-1
                    })
            
                }
            }
        }
    })
    if(isCorrect==true)
    {
        res.json({
            data:req.body,
            msg:"Password successfully modified",
            status:200
        })
    }
    else{

    }
}


module.exports.login = function (req, res) {

    //logic authentication
    let email = req.body.email
    let password = req.body.password

    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = 16; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

    user_model.findOne({
        $and: [
            { "email": email },
            { "password": password }
        ]
    }).populate("Role").exec(function (err, data) {
        if (data == "" || data == undefined) {
            res.json({
                status: -1,
                msg: "Invalid Credentails",
                data: req.body
            })
        } else {
            data.token1=result
            data.save(function(err,data2){
                if(err)
                {

                }
                else
                {
                    res.json({
                        status: 200,
                        msg: "Login done...",
                        data: data
                    })
                }
            })
        }
    });
}

module.exports.add_users = function(req,res){
    console.log("prob")
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let gender = req.body.gender
    let dob = req.body.dob
    let joindate = req.body.joindate
    let Role = req.body.Role
    let otp = req.body.otp
    let wrong_attept_count = req.body.wrong_attept_count
    let isLock = req.body.isLock

    let users = new user_model(
        {
            "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,
            "password" : password,
            "gender" : gender,
            "dob" : dob,
            "joindate" : joindate,
            "Role":Role,
            "otp" : otp,
            "wrong_attept_count" : wrong_attept_count,
            "isLock" : isLock
        }
    )

    users.save(function(err,data){
        if(err){
            console.log(err)
            res.json({
                msg : "USER NOT ADDED",
                status : -1,
                data : "SOMETHING WENT WRONG"
            })
        }
        else{
            console.log(data)
            res.json({
                msg : "USER ADDED",
                status : 200,
                data : data
            })
        }
    })
}

module.exports.getUserById = function(req,res){
    let userId = req.params.userId

    user_model.findOne({_id:userId}).populate("Role").exec(function(err,data){
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "user reterieved..",
                data: data
            })
        }
    })
}
module.exports.getAllUsers = function(req,res){
    user_model.find().populate("Role").exec(function(err,data){
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
                msg : "USERS",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.getAllPmUsers = function(req,res){
    user_model.find({Role:"62eb8e9c91cf048a78738ec5"}).populate("Role").exec(function(err,data){
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
                msg : "USERS",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.getAllTaskUsers = function(req,res){
    user_model.find({Role:"62c95db4d987329c27833c63"}).populate("Role").exec(function(err,data){
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
                msg : "USERS",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.deleteUser = function(req,res){
    let userId = req.params.userId;
    user_model.deleteOne({_id:req.params.userId},function(err,data){
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
                msg : "USER REMOVED",
                status : 1,
                data : data
            })
        }
    })
}

module.exports.updateUser = function(req,res){
    let userId = req.body.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    user_model.updateOne({_id:userId},{firstName:firstName,lastName:lastName},function(err,data){
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
                msg : "USER UPDATED",
                status : 200,
                data : data
            })
        }
    })

}