const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://fideliscode:piemispassword@cluster0-9jilr.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
}).then(result=>console.log('connected')).catch(err=>console.log('cannot connect'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const internshipRoutes = require('./api/routes/internships');
const usersRoutes = require('./api/routes/users');

app.use('/users', usersRoutes);
app.use('/internships', internshipRoutes);

module.exports = app;

