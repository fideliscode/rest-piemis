const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');


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

//returns all the interns
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
User.find({email:req.body.email})
.exec()
.then(user => {
  if (user.length>=1){
    return res.status(409).json({
      message : "user exists"
    });
  } else {  bcrypt.hash(req.body.password,10 ,(err,hash)=>{
      if (err){
        return res.status(500).json({
          error:err
        });
      }else{
      const user = new User({
          fname:req.body.fname,
          lname:req.body.lname,
          email:req.body.email,
          password:hash,
          phone:req.body.phone,
          role:req.body.role,
          profile:req.body.profile,
          company:req.body.company

});

user
.save()

.then(result=>{
  console.log(result);
  res.status(201).json({
    message:"user created"

  });
})

.catch(err=>{
  console.log(err);
  res.status(500).json({
    error:err
  });
});
}
});
 }
});

});

router.post('/login', (req, res,next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user=> {
      if (user.length < 1){

        return res.status(401).json({
          message: 'incorrectEmail'
        });
      }
      bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
    if (err){

       return res.status(401).json({
        message: 'incorrectPassword'
      });
    }
    if (result){
    const token = jwt.sign(
      {
        email:user[0].email,
        userid:user[0]._id
      },
      process.emv.JWT_KEY,
      {
        expiresIn:"1h"
      }
    );
      return res.status(200).json({

        message:'successful ',
        user:user,
        token:token,

      });
    }
    res.status(401).json({

      message: 'mismatch'
    });
      });
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({
         error : err
       });
     });
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
