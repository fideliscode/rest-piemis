const express = require('express');
const app = express();
const mongoose = require('mongoose');
var   bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMIddleware = multipart({uploadDir: './uploads'});
const internshipRoutes = require('./api/routes/internships');
const applicationRoutes = require('./api/routes/applications');
const tokenController =require('./api/controllers/tokenController');
const usersRoutes = require('./api/routes/users');
// const consumer1='https://angular-piemis.herokuapp.com';
// const consumer2 = 'http://localhost:4200';
const dburl = 'mongodb+srv://fideliscode:piemispassword@cluster0-9jilr.mongodb.net/test?retryWrites=true';
//const dburl = "mongodb://localhost:27017/uniinterndb"; 
//connecting to Mongodb atlas or local mongodb
mongoose.connect(dburl,{ useNewUrlParser: true,useFindAndModify: false})
.then(result=>console.log('connected'))
.catch(err=>console.log('cannot connect now'));
mongoose.set('useCreateIndex', true);
this.bodyParser = {
  json: {limit: '50mb', extended: true},
  urlencoded: {limit: '50mb', extended: true}
};
//using bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
 
 //cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//redirecting to routes
app.use('/applications', applicationRoutes);
app.use('/uploads', express.static('uploads'));
app.post('/confirmation', tokenController.confirmationPost);
app.post('/resend', tokenController.resendTokenPost);
app.use('/users', usersRoutes);
app.use('/internships', internshipRoutes);


module.exports = app;
