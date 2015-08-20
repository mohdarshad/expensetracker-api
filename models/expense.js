
var mongoose=require('mongoose');

var ExpenseSchema= new mongoose.Schema({
    itemName:String,
    itemCategory:String,
    price:Number,
    dateofPurchase:Date,
    modeofPurchase:String,
    userId:String

});
module.exports=mongoose.model('Expense',ExpenseSchema);