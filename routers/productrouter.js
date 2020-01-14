const express = require('express');
const product = require('../models/products');
const router = new express.Router;
const app = express();
const multer = require('multer');
const path = require("path");
var fs = require("fs");
const auth = require('../authfile/auth');

//image upload process
const storage = multer.diskStorage({
    destination: "./public/productuploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `${file.fieldname}-${Date.now()}${ext}`);
    }
});



const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Please Choose an Image to Upload not files."), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

//Product addition
router.post("/products/",auth.verifyUser, auth.verifyAdmin, upload.single('image'),(req, res) => {
    req.body.image = req.file.filename;
    console.log(req.body);
        product.create(req.body).then(function(){
            return res.json({successmsg :"Product added successfully"});
        }).catch(function(e){
            if(e.name === "ValidationError"){
                return res.status(403).json({errmsg: "Validation Error Occured."});
            }else{
                return res.status(402).json({errmsg:"Something Went Wrong. Try again!"});
            }
        });
    
});

//Product display
router.get('/products',auth.verifyUser,(req,res)=>{
    product.find().then(function(allproduct){
         res.json(allproduct);
    }).catch(function(e){
            res.json(e);
    });
});





module.exports = router;