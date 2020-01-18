const express = require('express');
const cart = require('../models/usercart');
const router = new express.Router;
const app = express();
const path = require("path");
var fs = require("fs");
const auth = require('../authfile/auth');

//cart add
router.post("/carts",auth.verifyUser,(req, res) => {
      console.log(req.body);
        cart.create(req.body).then(function(){
            return res.json({successmsg :"Product added to cart"});
        }).catch(function(e){
            if(e.name === "ValidationError"){
                return res.status(403).json({errmsg: "Validation Error Occured."});
            }else{
                return res.status(402).json({errmsg:"Something Went Wrong. Try again!"});
            }
        });
});


module.exports = router;