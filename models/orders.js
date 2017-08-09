var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var User=require('./signin');

var exp=new Schema({
    Name:{type:String},
    Address:{type:String},
    Mobile_No:{type:Number},
    Cart:{type:Object,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'}
})

var Order=mongoose.model('Order',exp);