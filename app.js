const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMIddleware = multipart({uploadDir: './uploads'}); 
const internshipRoutes = require('./api/routes/internships');
const usersRoutes = require('./api/routes/users');
// const consumer = 'http:127.0.0.1:4200';
const consumer='https://angular-piemis.herokuapp.com';

const dburl = 'mongodb+srv://fideliscode:piemispassword@cluster0-9jilr.mongodb.net/test?retryWrites=true';

mongoose.connect(dburl,{ useNewUrlParser: true})
.then(result=>console.log('connected'))
.catch(err=>console.log('cannot connect now'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", consumer);
  res.header("Access-Control-Allow-Methods", " POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users', usersRoutes);
app.use('/internships', internshipRoutes);

module.exports = app;

