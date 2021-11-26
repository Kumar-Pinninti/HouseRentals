const express = require('express');
const router = express.Router();
const checkUserAuth = require('../../middleware/userAuth');
const coverImageController = require('../../controller/user/coverImage');
// const multer = require('multer');
// const dateFormat = require('dateformat');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '../../../public/image');
//     },
//     filename: function(req, file, cb) {
//         cb(null, dateFormat('yyyymmddHHMMss').toString() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

router.get('/:coverImageID', coverImageController.getOneCoverImage);
//router.patch('/update/:coverImageID', upload.single('image'), coverImageController.updateCoverImage);
router.patch('/update/:coverImageID', coverImageController.updateCoverImage);

module.exports = router;