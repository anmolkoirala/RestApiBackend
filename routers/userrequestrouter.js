const express = require('express');
const userrequest = require('../models/userrequest');
const router = new express.Router;
const bcrypt = require('bcrypt');
const app = express();
const auth = require('../authfile/auth');

//user Request Add
router.post("/request",auth.verifyUser,(req, res) => {
    console.log(req.body);
    userrequest.create(req.body).then(function(){
        return res.json({successmsg :"Request Submitted. We will update you soon. Thank you!"});
    }).catch(function(e){
        if(e.name === "ValidationError"){
            return res.status(403).json({errmsg: "Validation error."});
        }else{
            res.send(e);
        }
    });
});


//request as per user id
router.get('/user/request/:id',auth.verifyUser,(req,res)=>{
    userrequest.find({userID:req.params.id}).then(function(req){
         res.json(req);
    }).catch(function(e){
            res.json(e);
    });
});

//admin views all request
router.get('/request',auth.verifyUser, auth.verifyAdmin,(req,res)=>{
    userrequest.find().then(function(req){
         res.json(req);
    }).catch(function(e){
            res.json(e);
    });
});


module.exports = router;