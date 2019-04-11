const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Internship = require('../models/internship');



router.post('/', (req, res, next)=>{
 //extracting request body to the create an internship
 const internship = new Internship({
	name:req.body.name,
    description:req.body.description,
    internshipfile:req.body.internshipfile,
    professional:req.body.professional,
    interns:req.body.interns,
    category:req.body.category,
    tags:req.body.tags,
    chats:req.body.chats, 
	isPublished:req.body.isPublished,
	internshipPositon:req.body.internshipPositon,
    internshipfunction: req.body.internshipfunction,
    

 });
 //saving intership to the database
 internship.save()
   .then( result => {
	    console.log(result);
	    res.status(200).json({internship:internship});
	    })
   .catch(err=>{
	    console.log(err.message);
	    res.status(500).json({error:err});
	    });
});
//retrieve all internships
router.get('/', (req, res, next)=>{
 Internship.find()
   .exec()
   .then(docs =>{
	   if(docs){
		   res.status(200).json(docs);
		}else{
			res.status().json("there are no registered internships yet");
		}
	})
   .catch(err=>{
	   console.log(err.message);
	   res.status(200).json({error: err})});
});

//retrieving an intership from the database
router.get('/:internshipid', (req, res, next)=>{
   const id = req.params.internshipid;
   Internship.findById(id)
   .exec()
   .then(doc=>{
	   console.log(doc);
	   if(doc){
		   res.status(200).json(doc)
		}else{
			res.status(404).json("no intership with that id")
		}
	    
       })
   .catch(err=>{
	   console.log(err);
	   res.status(500).json({error : err});
	    });
});
//Edit Internship document
router.put('/:internshipid', (req, res, next)=>{
	const id = req.params.internshipid;
	Internship.findOneAndUpdate({_id: id}, req.body)
	.exec()
	.then(result=>{
		console.log(result); 
		if(result){
			res.status(200).json("item updated!")}
		else{
			res.status(404).json("there is no intership with that id");
		}
		})
		.catch(err =>{console.log(err.messsage);res.status(404).json({error: err.message});});
});
//Deleting a specific internship
router.delete('/:internshipid', (req, res, next)=>{
	const id = req.params.internshipid;
	Internship.findByIdAndDelete({_id: id})
	.exec()
	.then(result=>{
		console.log(result); 
		if(result){
			res.status(200).json("item deleted!")}
		else{
			res.status(404).json("there is no intership with that id");
		}
		})
	.catch(err =>{
		console.log(err.messsage);
		res.status.json({error: err});});
});
module.exports= router;


