const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');


router.get('/', (req, res, next)=>{
 User.find()
   .exec()
   .then(docs =>{
       if(docs){
           res.status(200).json(docs);
        }else{
            res.status().json("there are no registered users yet");
        }
    })
   .catch(err=>{
       console.log(err.message);
       res.status(200).json({error: err})});
});

router.post('/', (req, res, next)=>{
  //console.log(req.body);
const user = new User({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone,
    role:req.body.role,
    // profile:{
    //     bio: req.body.profile.bio,
    //     image: req.body.profile.image,
    //     skills: req.body.profile.skills,
    //     location: req.body.profile.location,
    //     Institution: req.body.profile.Institution,
    //     dob:req.body.profile.dob}
});
user.save()
.then( result => {
  res.status(200).json({CreatedUser: user, message: "success"});
})
.catch(err=>{console.log(err.message);});     
});

router.get('/:userid', (req, res, next)=>{
	const id = req.params.productid;
	if (id ==='special') 
		{res.status(200).json({message:"handling GET requests",
		 id:id})}
	else{
		res.status(404).json({message:"no user with the id are found!"})
		}
	
});
module.exports= router;


