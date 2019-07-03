const mongoose = require('mongoose');


const applicationSchema = mongoose.Schema({
 _id:mongoose.Schema.Types.ObjectId,
theinternship:{type:mongoose.Schema.Types.ObjectId,ref:'Internship'},
status:{ type:String, default:"pending"},
intern:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
professional:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
}, {timestamps:true});

module.exports = mongoose.model('Application', applicationSchema);
