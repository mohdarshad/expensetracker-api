var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

    UserSchema.pre('save',function(callback){
        var user=this;
        console.log("password: "+user.password);
        if(!user.isModified('password')){
            console.log("in pre save if blockg");
            return callback();
        }

        else{
            console.log("in pre save else blosck for hashing");
            bcrypt.genSalt(5, function(err, salt) {
                if (err) return callback(err);

                bcrypt.hash(user.password, salt, null, function (err, hash) {
                    console.log("error: " + err);
                    console.log("hash : " + hash);
                    if (err) {
                        console.log("in pre save error block: " + err);
                        return callback(err);
                    }
                    console.log("hash value is : " + hash);
                    user.password = hash;
                    callback();
                })
            })
        }
    })


UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports=mongoose.model('User',UserSchema);