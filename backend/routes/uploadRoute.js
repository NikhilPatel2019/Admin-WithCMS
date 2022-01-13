const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'uploads');
    },
    filename(req,file,cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

//Checking file type 
function checkImageType(file,cb) {
    const filetypes = /jpg|jpeg|png|gif/
    //check file type with given types
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb("Image Types jpg | jpeg | png | gif only supported.")
    }
}

//Checking file type 
function checkFileType(file,cb) {
    const filetypes = /txt|pdf/
    //check file type with given types
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb("File Types txt | pdf only supported.")
    }
}
 
const uploadImage = multer({ 
    storage,
    fileFilter: function(req, file, cb) {
        checkImageType(file,cb)
    }
})

const uploadFile = multer({ 
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file,cb)
    }
})

router.post('/image', uploadImage.single('file'), (req,res) => {
    res.send(`${req.file.path}`);
})

router.post('/file', uploadFile.single('file'), (req,res) => {
    res.send(`${req.file.path}`);
})

module.exports = router;