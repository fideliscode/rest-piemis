const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://fideliscode:piemispassword@cluster0-9jilr.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
}).then(result=>console.log('connected')).catch(err=>console.log('cannot connect'));

const internshipRoutes = require('./api/routes/internships');
const usersRoutes = require('./api/routes/users');

app.use('/users', usersRoutes);
app.use('/internships', internshipRoutes);

module.exports = app;

