 const mongoose = require('mongoose');


const internshipSchema = mongoose.Schema({

    internshipPosition: {type:String},//required
    description: {type:String},//required
    internshipfile:{type:String},
    qualifications:{type:String}, //required
    rating:[Number],
    professional:{                            //required
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vacancy:{type:Number},
    subcategory:{type:String},
    tags:[String],
    isPublished:{
        type:String,
        default:"NOT PUBLISHED",
    }
}, {timestamps:true});

module.exports = mongoose.model('Internship', internshipSchema);
