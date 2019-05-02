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

//retruns all the interns
router.get('/interns', (req, res, next)=>{
 User.find({"role":"intern"})
   .exec()
   .then(docs =>{
       if(docs){
           res.status(200).json(docs);
        }else{
            res.status().json("there are no registered interns yet");
        }
    })
   .catch(err=>{
       console.log(err.message);
       res.status(200).json({error: err})});
});

//returns all the professionals
router.get('/professional', (req, res, next)=>{
 User.find({"role":"professional"})
   .exec()
   .then(docs =>{
       if(docs){
           res.status(200).json(docs);
        }else{
            res.status().json("there are no registered interns yet");
        }
    })
   .catch(err=>{
       console.log(err.message);
       res.status(200).json({error: err})});
});


router.post('/', (req, res, next)=>{ 
const user = new User({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone,
    role:req.body.role,
    profile:req.body.profile,
    company:req.body.company
});
user.save()
.then( result => {
  res.status(200).json(user);
})
.catch(err=>{console.log(err.message);});     
});



router.get('/:userid', (req, res, next)=>{
	const id = req.params.userid;
  User.findById(id)
  .exec()
  .then(doc=>{
     console.log(doc);
     if(doc){
       res.status(200).json(doc);
    }else{
      res.status(404).json("no user with that id");
    }
      
       })
  .catch(err=>{
     console.log(err);
     res.status(500).json({error : err});
      });	
});



router.put('/:userid', (req, res, next)=>{
  const id = req.params.userid;
  User.findOneAndUpdate({_id: id}, req.body)
  .exec()
  .then(result=>{
    console.log(result); 
    if(result){
      res.status(200).json(result);}
    else{
      res.status(404).json("sorry! there is no user with that id");
    }
    })
  .catch(err =>{
    console.log(err.messsage);
    res.status(404).json(err.message);
  });

});


module.exports= router;


