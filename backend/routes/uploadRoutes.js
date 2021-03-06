import express from 'express';
import multer from 'multer';
const router = express.Router();
import path from 'path'



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = function (file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        return cb(`Image only!`)
    }
}

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})


router.post("/", upload.single('image'), (req, res) => res.send(`/${req.file.path}`))




export default router