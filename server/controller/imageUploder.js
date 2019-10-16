/*const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const datauri = require('datauri');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new datauri();

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = {multerUploads, dataUri}; 
*/
const multer = require('multer');
const crypto = require('crypto');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        
        });
    }
});
//const upload = multer({ storage: storage });
const multerUploads = multer({ storage }).single('image');
module.exports = {multerUploads}; 