var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var products=new Schema({
    ImagePath:{
        type:String,required:true
    },
    Title:{
        type:String,required:true
    },
    Description:{
        type:String,required:true
    },
    price:{
        type:Number,required:true
    },
    quantity:{
        type:Number,required:true
    },
    tag:{
        type:String
    }
});

module.exports=mongoose.model('model',products);