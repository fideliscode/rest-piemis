const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
	res.status(200).json({
		message:"handling GET requests"
	})
});

router.post('/', (req, res, next)=>{
	res.status(200).json({
		message:"handling POSTrequests"
	})
});

router.get('/:productid', (req, res, next)=>{
	const id = req.params.productid;
	if (id ==='special') 
		{res.status(200).json({message:"handling GET requests",
		 id:id})}
	else{
		res.status(404).json({message:"no cintenships with the id are found!"})
		}
	
});
module.exports= router;


