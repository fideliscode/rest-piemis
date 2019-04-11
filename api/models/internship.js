const mongoose = require('mongoose');



const internshipSchema = mongoose.Schema({
    
    internshipPositon: {type:String,required:true},
    internshipfunction: {type:String,required:true},
    internshipfile:[{path:String,filetype:String}],
    description:{type:String,required: true},
    professional:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User', required: true
    },
    interns:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }],
    category:{ 
        name:{type:String, required:true},
        subcategory:{type:String, required:true}},
    tags:[String],
    chats:[{
        userid:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true,},
        body:{type:String},
        //order:{type:Number},
        time : { type : Date, default: Date.now }
        
    }],
    isPublished:{
        type:Boolean, 
        default:false,
    }
}, {timestamps:true});

module.exports = mongoose.model('Internship', internshipSchema);