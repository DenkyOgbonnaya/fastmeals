const multer = require('multer');
const crypto = require('crypto');
const path = require('path')

const storage = multer.diskStorage({
    destination: 'public/images/meals',
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        
        });
    }
});
const upload = multer({ storage: storage });
module.exports = upload; 
