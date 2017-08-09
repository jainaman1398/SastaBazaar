const passport=require('passport');
var User=require('./models/signin');
const LocalStrategy=require('passport-local').Strategy;
console.log("passport");

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup',new LocalStrategy({
    usernameField:'Email',
    passwordField:'password',
    passReqToCallback:true
},function (req,Email, password, done) {
   /* req.checkBody('Email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:6});
    var  errors=req.validationErrors();
    if(errors)
    {
        var messages=[];
        errors.forEach(function (err,docs) {
            messages.push(docs.msg);
        });
        return(done,null,req.flash('error',messages));
    }*/
    User.findOne({'Email':Email},function (err,user) {
        if(user){
            return done(null,false,{message:"user is registered already"}); //msg
        }
        var newUser=new User();
        newUser.Email=Email;
        newUser.password=password;
        newUser.save(function (err,result) {
            if(err){
                return done(err);}
            return done(null,newUser);
        });
    });
})) ;

passport.use('local.signin',new LocalStrategy({
    usernameField:'Email',
    passwordField:'password',
    passReqToCallback:true
},function (req,Email, password, done) {
    User.findOne({'Email': Email}, function (err, user) {
        if (!user) {
            return done(null, false, {message: "user doesn't Exist"}); //msg
        }
     if(user.password!=password){
            return done(null,false,{message:"Password is Incorrect"});
     }
     return done(null,user);
    });
}));

/*
User.find(function (err,docs) {
  console.log(docs);
})
let y='ajjain.aman13eee3@gmail.com';
    let t=User.findOne({'Email':y},function (err,user) {
        console.log(user.password);
    })
*/
module.exports=passport;