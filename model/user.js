const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schems({
    name:{
    type:String,
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
       
    },
    mobile:{
type:String
    },
    address:{
type:String,
 required:true
    },
    aadharCard:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["voter","admin"],
        deafult:'voter'
    },
    isvoted:{
        type:Boolean,
        default:false
    }
})


const User=mongoose.model('User',userSchema);
module.exports;