var User=require('../models/user');

exports.addUser=function(req,res){
    var user= new User({
        username:req.body.username,
        password:req.body.password
    })

    console.log("username :"+user.username);
    user.save(function(err){
        if(err){
            console.log("in the save error block")
            res.send(err);
        }else{
            console.log("in the save success block")
            res.json({message:"User has been added "});
        }
    })
}

exports.getUsers=function(req,res){
    User.find(function(err,users){
        if(err){
            res.send(err)
        }else{
            res.json(users)
        }
    })
}