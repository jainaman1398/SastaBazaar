var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var User=require('./signin');

var done=new Schema({
    Name:{type:String,required:true},
    Address:{type:String,required:true},
    Mobile_No:{type:Number,required:true},
    Carting:{type:Object,required:true},
    Mail:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'}
});

var aman=mongoose.model('aman',done);
module.exports=aman;