const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,default:''},
    role:{type:String,required:true},
   profile:{
        bio:{String},
        image: {type:String},
        skills: {type:[String]},
        location: {type:String},
        Institution: {type:String},
        dob:{type:Date},required:false}

  },
   {timestamps: true});
   
   module.exports = mongoose.model('User', userSchema);