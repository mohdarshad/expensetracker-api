var express=require('express');
var mongoose=require('mongoose');
var passport=require('passport');
var authController=require('./controllers/authorization')
var expenseController=require('./controllers/expensecontroller');
var userController=require('./controllers/usercontroller');
var bodyparser=require('body-parser');


mongoose.connect('mongodb://localhost:27017/myexpense');

var app=express();
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(passport.initialize());

var port= process.env.PORT || 3000;

var router=express.Router();
router.route('/expense')
    .post(authController.isAuthenticated,expenseController.addExpense)
    .get(authController.isAuthenticated,expenseController.getExpense);

router.route('/expense/:expenseId')
    .get(authController.isAuthenticated,expenseController.findExpense)
    .put(authController.isAuthenticated,expenseController.updateExpense)
    .delete(authController.isAuthenticated,expenseController.deleteExpense);

router.route('/users')
    .post(userController.addUser)
    .get(authController.isAuthenticated,userController.getUsers);

app.use('/api',router);
app.listen(port);
console.log("listening at port: "+port);
