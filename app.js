const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMIddleware = multipart({uploadDir: './uploads'}); 
const internshipRoutes = require('./api/routes/internships');
const usersRoutes = require('./api/routes/users');




mongoose.connect('mongodb+srv://fideliscode:piemispassword@cluster0-9jilr.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
})
.then(result=>console.log('connected'))
.catch(err=>console.log('cannot connect'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use('/users', usersRoutes);
app.use('/internships', internshipRoutes);

module.exports = app;

