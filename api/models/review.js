const mongoose = require('mongoose');
const User = require('../models/user');
const Internship = require('../models/internship');

const reviewSchema = mongoose.Schema({

_id:mongoose.Schema.Types.ObjectId,
user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
internship:{type:mongoose.Schema.Types.ObjectId, ref:'Internship'},
body:{type:String}
},
{timestamps:true} );




module.exports = mongoose.model('Review', reviewSchema);     
