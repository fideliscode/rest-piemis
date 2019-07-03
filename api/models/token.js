const mongoose = require('mongoose');
const User = require('../models/user');

const tokenSchema = new mongoose.Schema({
    _userId: {
     type: mongoose.Schema.Types.ObjectId, 
    required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
module.exports = mongoose.model('userToken', tokenSchema);