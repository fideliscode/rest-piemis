const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const multipart = require('connect-multiparty');
const multer =require('multer');


const storage = multer.diskStorage({
	destination: function(re, file, cb){
		cb(null, './uploads');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (req,file,cb)=>{
	if(file.mimetype ==='image/jpeg'|| 
		file.mimetype ==='image/png' || 
		file.mimetype ==='image/jpg'){cb(null,true);
     }
    else{
	cb(null, false);
    }
}
const upload = multer({
	storage:storage, 
	limits:{filesize:1024*1024*5},
	fileFilter:fileFilter
});

const User = require('../models/user');
const Internship = require('../models/internship');
const Review = require('../models/review');



router.post('/',upload.single('internshipfile'), (req, res, next)=>{
 //extracting request body to the create an internship


 const internship = new Internship({
	internshipPosition:req.body.internshipPosition,
    description:req.body.description,
    internshipfile:req.file.path,
    professional:req.body.professional,
    // interns:req.body.interns,
    vacancy:req.body.vacancy,
    subcategory:req.body.subcategory,
    tags:[req.body.tag1,req.body.tag2,req.body.tag3],
    // chats:req.body.chats,
	isPublished:req.body.isPublished,
    qualifications: req.body.qualifications,


 });

 //saving intership to the database
 internship.save()
   .then( result => {
	    console.log(result);
	    res.status(200).json({internship:internship, message:"success"});
	    })
   .catch(err=>{
	    console.log(err.message);
	    res.status(200).json({internship:null,message:err.message});
	    });
});

 
//search by by text
router.get('/internships/text/:search', (req, res, next)=>{
	 const regex = new RegExp(escapeRegex(req.params.search), 'gi');
	// const search = req.params.search;
 Internship.find({internshipPosition:regex, isPublished:"PUBLISHED"})
 .populate('professional')
 .exec().then(docs =>{
 	if(docs.length > 0){
			
               res.status(200).json({search:docs, msg:"success"});
	   
		}else{
			res.status(200).json({search:docs,msg:"no internships"});
		}
	})
   .catch(err=>{
	   // console.log(err.message);
	   res.status(200).json({msg: err.message})});
});



//search by category
router.get('/internships/:search', (req, res, next)=>{
	const search = req.params.search;
 Internship.find({subcategory:search,isPublished:"PUBLISHED"})
 .populate('professional')
 .exec().then(docs =>{
 	if(docs.length > 0){
			
               res.status(200).json({search:docs, msg:"success"});
	   
		}else{
			res.status(200).json({search:docs,msg:"no internships"});
		}
	})
   .catch(err=>{
	   // console.log(err.message);
	   res.status(200).json({msg: err.message})});
});




//get all published  and unpublished internships
router.get('/pro', (req, res, next)=>{
 Internship
 .find()
 // .select("_id internshipfile professional updatedAt internshipPosition ")
 .populate('professional')
 .exec().then(docs =>{
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


//get all published internships
router.get('/', (req, res, next)=>{
 Internship
 .find({isPublished:"PUBLISHED"})
 // .select("_id internshipfile professional updatedAt internshipPosition ")
 .populate('professional')
 .exec().then(docs =>{
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

//retrieving an internship from the database
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
	Internship.findOneAndUpdate({_id: id}, req.body,{new: true})
	.exec()
	.then(result=>{
		console.log(result);
		if(result){
			res.status(200).json({internship:result, msg:"updated"});
		}else{
			res.status(200).json({internship:null,msg:"there is no intership with that id"});
		}
		})
		.catch(err =>{
			console.log(err.messsage);res.status(404).json({internship:null,msg:err.message});
});
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
			res.status(404).json("there is no internship with that id");
		}
		})
	.catch(err =>{
		console.log(err.message);
		res.status.json({error: err});});
});



 //Posting an apliction to the internship
router.post('/review', (req,res,next)=>{

const review = new Review({
 _id: new mongoose.Types.ObjectId(),	
 user:req.body.user,
 internship:req.body.internship,
 body:req.body.body,
 });
 //saving review to the database
 review.save()
   .then( result => {
	    console.log(result);
	    res.status(200).json({review:review, message:"success"});
	    })
   .catch(err=>{
	    console.log(err.message);
	    res.status(200).json({review:null,message:err.message});
	    });
});




// Retriev all reviews
router.get('/review', (req, res, next)=>{
 Review.find()
 // .select("_id internshipfile professional updatedAt internshipPosition ")
 .populate('user internship')
 .exec().then(docs =>{
	   if(docs){
		   res.status(200).json(docs);
		}else{
			res.status().json("there are no reviews yet");
		}
	})
   .catch(err=>{
	   console.log(err.message);
	   res.status(200).json({error: err})});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports= router;
