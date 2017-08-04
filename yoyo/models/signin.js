var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var yoyo=new Schema({
    Email:{
        type:String,require:true
    },
    password:{
       type:String,require:true
    }
},{runSettersOnQuery: true});

var User=mongoose.model('User',yoyo);
module.exports=User;