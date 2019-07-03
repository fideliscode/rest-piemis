const Internship = require('../models/internship');
const Application = require('../models/application');
const Review = require('../models/review');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const UserToken = require('../models/token');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const dotenv = require('dotenv');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
dotenv.config();

//const thehost = 'localhost:4200';
const thehost = 'https://angular-piemis.herokuapp.com';







 

 //Posting an apliction to the internship
router.post('/', (req,res,next)=>{


  Application.find({intern: req.body.intern, theinternship: req.body.theinternship})
  .exec()
  .then(doc=>{
   
     if(doc.length > 0){
      return res.status(200).json({res:doc, message:"exist"});
     }
     else{
     
     	const application = new Application({
        _id: new mongoose.Types.ObjectId(),	
        intern:req.body.intern,
        professional:req.body.professional,
        theinternship:req.body.theinternship,
        status:req.body.status
        });
 //saving application to the database
        application.save()
        .then( result => {
	    // console.log(result);
	    res.status(200).json({application:application, message:"success"});
	    })
        .catch(err=>{
	    // console.log(err.message);
	    res.status(200).json({application:null,message:err.message});
	    });

     }
   })
  .catch(err=>{
     return res.status(500).json({message:err.message});
      });

});




// Retriev all applications
router.get('/', (req, res, next)=>{
 Application.find()
 // .select("_id internshipfile professional updatedAt internshipPosition ")
 .populate('intern theinternship')
 .exec().then(docs =>{
	   if(docs){
		   res.status(200).json(docs);
		}else{
			res.status(200).json("there are no applications yet");
		}
	})
   .catch(err=>{
	   // console.log(err.message);
	   res.status(200).json({error: err})});
});


router.get('/notifications/:id', (req, res, next)=>{
	const id = req.params.id;
 Application.find({status:"pending", professional: id})
 .populate('theinternship intern')
 .exec().then(docs =>{
 	if(docs.length > 0){
			
               res.status(200).json({count:docs.length, applications:docs});
	   
		}else{
			res.status(200).json("there are no applications yet");
		}
	})
   .catch(err=>{
	   // console.log(err.message);
	   res.status(200).json({error: err.message})});
});
 




 module.exports= router;