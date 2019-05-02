const mongoose = require('mongoose');



const internshipSchema = mongoose.Schema({
    
    internshipPositon: {type:String},//required
    internshipfunction: {type:String},//required
    internshipfile:[{path:String,filetype:String}],
    description:{type:String}, //required
    professional:{                            //required
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    },
    interns:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }],
    category:{                      //required
        name:{type:String},
        subcategory:{type:String}
    },
    tags:[String],
    chats:[{
        userid:{type:mongoose.Schema.Types.ObjectId, ref:'User'},//required
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