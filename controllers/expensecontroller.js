var Expense=require('../models/expense');

exports.addExpense=function(req,res){
    var expense= new Expense;

    console.log(req.user._id);
    console.log(req.user.username);
    console.log(req.user.password);
    expense.itemName=req.body.itemName;
    expense.itemCategory=req.body.itemCategory;
    expense.price=req.body.price;
    expense.dateofPurchase=req.body.dateofPurchase;
    expense.modeofPurchase=req.body.modeofPurchase;
    expense.userId=req.user._id;

    expense.save(function(err){
        if(err){
            res.send("error");
        }else{
            res.json({message:"item added into database",data:expense});
        }
    })
}

exports.getExpense=function(req,res){
    Expense.find(function(err,expenses){
        if(err){
            res.send(err);
        }else{
            res.json({message:expenses});
        }
    })
}

exports.findExpense=function(req,res){
    Expense.findById(req.params.expenseId,function(err,expense){
        if(err){

        }else{
            res.json({message:expense});
        }
    })
}

exports.updateExpense=function(req,res){
    Expense.findById(req.params.expenseId,function(err,expense){
        if(err){

        }else{
            console.log(req.body.itemName);
            expense.itemName=req.body.itemName;
            expense.save(function(err){
                if(err){

                }else{
                    res.json({message:expense});
                }
            })
        }
    })
}


exports.deleteExpense=function(req,res){
    Expense.findByIdAndRemove(req.params.expenseId,function(err,expense){
        if(err){

        }else{
            res.json({message:"the item has been removed"});
        }
    })
}