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


//get all users
router.get('/', (req, res, next)=>{
 User.find()
   .exec()
   .then(docs =>{
       if(docs){
          return res.status(200).json(docs);
        }else{
            return res.status().json("there are no registered users yet");
        }
    })
   .catch(err=>{
       console.log(err.message);
       return res.status(200).json({error: err})});
});

//returns all the interns
router.get('/interns', (req, res, next)=>{
 User.find({"role":"intern"})
   .exec()
   .then(docs =>{
       if(docs){
          return res.status(200).json(docs);
        }else{
           return res.status().json("there are no registered interns yet");
        }
    })
   .catch(err=>{
       console.log(err.message);
     return  res.status(200).json({message: err.message})});
});

//returns all the professionals
router.get('/professionals', (req, res, next)=>{
 User.find({"role":"professional"})
   .exec()
   .then(docs =>{
       if(docs){
           res.status(200).json(docs);
        }else{
          return  res.status().json("there are no registered interns yet");
        }
    })
   .catch(err=>{
       console.log(err.message);
      return res.status(200).json({message: err.message})});
});


//Registering a new user
router.post('/', (req, res, next)=>{
User.find({email:req.body.email})
.exec()
.then(user => {
  if (user.length>=1){
    return res.status(200).json({ message : "user_exists" });
  }
  else {
    bcrypt.hash(req.body.password,10 ,(err,hash)=>{
      if (err){
        return res.status(200).json({ message:"sys_error"});
      }
      else{
      const user = new User({
          _id: new mongoose.Types.ObjectId(),
          fname:req.body.fname,
          lname:req.body.lname,
          email:req.body.email,
          password:hash,
          phone:req.body.phone,
        
        
          company:req.body.company,

role:req.body.role,
          bio:req.body.bio,
          image:req.body.image,
          skills:req.body.skills,
          location:req.body.location,
          Institution:req.body.Institution

        });
     // Save the user
     user.save()
     .then(result=>{
      // Create a verification token for this user
      var userToken = new UserToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      // Save the verification token
      userToken.save()
      .then( result=>{
         // Send the email
         var transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { 
              user: process.env.GMAIL_USERNAME, 
              pass: process.env.GMAIL_PASSWORD } });
        //creating a mail options
         var mailOptions = { 
           from: 'uniinterntz@gmail.com', 
           to: user.email, 
           subject: 'Account Verification Token',
           // text: 'Hello,\n\n' +
           //  'Please verify your account by clicking the link: \nhttp:\/\/' 
           //  + req.headers.host + '\/confirmation\/' + userToken.token + '.\n'
              text: 'Hello,\n\n' +
            'Please verify your account by clicking the link: \nhttp:\/\/' 
            + thehost + '\/users\/confirmation' +'?token=' + userToken.token + '?email='+ user.email +'.\n'
         };
         //sending the email
         transporter.sendMail(mailOptions, function (err) {
             if (err) {
               console.log(err.message);
                return res.status(200).send({ message: err.message }); }
             return res.status(200).json({message:"verify_email"});
          });
      })
      .catch(err=>{return res.status(200).send({ message: err.message }); 
    });
    
      })
     .catch(err=>{console.log(err); res.status(200).json({ message:err.message});});
     }
  });
  }
})
.catch( err=>{ return res.status(200).json({message:err.message});});
});



//log in user
router.post('/login', (req, res,next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user=> {
      //check if user email exists in db
      if (user.length < 1){   
        return res.status(200).json({message: 'incorrectEmail'});
      }
      else{
       
        //compare hashed passwords
         bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
           if (!result){
              return res.status(200).json({ message: "wrong password"});
           }
           else if (result){
            //check if user is varified via email
                if (!user[0].isVerified){
                return res.status(200).send({ type: 'not-verified',
                 message: 'Your account has not been verified.',
                user:user[0].isVerified });
                }
                else{
                  //generate a token and sign the user
                  const token = jwt.sign({email:user[0].email,userid:user[0]._id},
                    "badPractice",{expiresIn:"6h"});
                  return res.status(200).json({ message:'successful ', user:user[0], token:token});
                }
           }
         
         });
      }
    })
    .catch(err=>{
       res.status(200).json({ message : 'serverError'});
     });
});




//retrieve a sigle user
router.get('/:userid', (req, res, next)=>{
  const id = req.params.userid;
  User.findById(id)
  .exec()
  .then(doc=>{
     console.log(doc);
     if(doc){
      return res.status(200).json(doc);
     }
     else{
      res.status(404).json({message:"user does not exist"});
     }
   })
  .catch(err=>{
     return res.status(500).json({message:err.message});
      });
});


//update user information
router.put('/:userid', (req, res, next)=>{
  const id = req.params.userid;
  User.findOneAndUpdate({_id: id}, req.body,{new: true})
  .exec()
  .then(result=>{
    if(result){
      
     return  res.status(200).json({user:result,message:"company registered"});}
    else{
     return res.status(404).json({message:"user does not exist"});
    }
    })
  .catch(err =>{
   return  res.status(404).json({message:"sys error"});
  });

});


//Deleting a specific user
router.delete('/:userid', (req, res, next)=>{
  const id = req.params.userid;
  User.findByIdAndDelete({_id: id})
  .exec()
  .then(result=>{
    console.log(result);
    if(result){
      res.status(200).json("item deleted!")}
    else{
      res.status(404).json("there is no user with that id");
    }
    })
  .catch(err =>{
    return res.status.json({error: err.message});
  });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports= router;
