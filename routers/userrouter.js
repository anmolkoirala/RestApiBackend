const express = require('express');
const user = require('../models/user');
const router = new express.Router;
const bcrypt = require('bcrypt');
const app = express();

//user registration
router.post("/user/registration",(req, res) => {
    //changed values
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body);
    user.create(req.body).then(function(){
        return res.json({successmsg :"User Account Successfully created"});
    }).catch(function(e){
        if(e.name === "ValidationError"){
            return res.status(403).json({errmsg: "Email already in use. Try again!"});
        }else{
            res.send(e);
        }
    });
});

module.exports = router;