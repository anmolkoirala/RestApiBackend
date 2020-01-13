const express = require('express');
const user = require('../models/user');
const router = new express.Router;
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('../authfile/auth');


//user registration
router.post("/user/registration",(req, res) => {
    //changed values
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body);
    user.create(req.body).then(function(){
        console.log("success");
        return res.json({successmsg :"User Account Successfully created"});
        
    }).catch(function(e){
        console.log("error");
        if(e.name === "ValidationError"){
            return res.status(403).json({errmsg: "Email already in use. Try again!"});
        }else{
            res.send(e);
        }
    });
});

//admin user registration
router.post("/admin/registration",auth.verifyUser, auth.verifyAdmin,(req, res) => {
    //changed values
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    user.create(req.body).then(function(){
        return res.json({successmsg :"Admin created Successfully"});
    }).catch(function(e){
        if(e.name === "ValidationError"){
            return res.status(403).json({message: "Email already in use. Try again!"});
        }else{
            res.send(e);
        }
    });
});

//User login
router.post('/user/login', (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then((usr) => {
            if (usr == null) {
                let err = new Error('404: User credentials found!');
                err.status = 404;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, usr.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('ERROR: Incorrect Password. Please try again!');
                            err.status = 400;
                            return next(err);
                        }
                        let token = jwt.sign({ id: usr._id}, process.env.SECRET,{
                            expiresIn: 60 * 24 *24
                          });     
                        const userinfos ={
                            id: usr._id, fullname: usr.fullname, email: usr.email
                            ,contactnum: usr.contactnum,
                            address: usr.address, adminrole: usr.admin, superrole:usr.superadmin
                        }
                        res.json({ userStatus: 'User Log In Success!', token: token, logininfo: userinfos });
                    }).catch(next);
            }
        }).catch(next);
});

router.put('/userprofile/update/:id',auth.verifyUser,auth.verifyAdmin,(req,res)=>{
    user.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         res.status(200).json({successmsg:"General Details Updated"});
    }).catch(function(e){
         res.send(e)
    });
});

router.put('/customerprofile/update/:id',auth.verifyUser,(req,res)=>{
    console.log(req.params.token);
    user.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
         console.log(res.body);
         res.status(200).json({successmsg:"General Details Updated"});
    }).catch(function(e){
         res.send(e)
    });
});

router.get('/userprofile/uno/:id',auth.verifyUser,(req,res)=>{
    user.findOne({_id:req.params.id}).then(function(user){
            console.log(user);
            res.json(user);
    }).catch(function(e){
            res.json(e)
    });
});

router.get('/user/displayall',auth.verifyUser,auth.verifyAdmin,(req,res)=>{
    user.find().then(function(user){
            res.json(user);
    }).catch(function(e){
            res.json(e)
    });
});

router.get('/display/users/:id',auth.verifyUser,(req,res)=>{
   user.findOne({_id:req.params.id}).then(function(cuser){
         res.json(cuser);
    }).catch(function(e){
            res.json(e);
    });
});

router.delete('/remove/user/:id',auth.verifyUser,auth.verifyAdmin,(req,res)=>{
    user.findOne({_id:req.params.id}).then(function(found){
        if(found.superadmin === true){
           res.json({successmsg:"Cannot Remove Super Admin"});
        }else{
            user.findByIdAndDelete(found._id).then(function(){
                res.status(200).json({successmsg:"User Account Terminated"});
              }).catch(function(e){
                  res.status(402).json({errmsg:"Account could not be terminated"});
              });
            console.log("can be removed");
        }
    }).catch(function(e){

    });
  
});



module.exports = router;