const express = require('express');
const router = express.Router();
const checkUserAuth = require('../../middleware/userAuth');
const houseImageController = require('../../controller/user/houseImage');
// const multer = require('multer');
// const dateFormat = require('dateformat');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/image');
//     },
//     filename: function(req, file, cb) {
//         // cb(null, dateFormat('yyyymmddHHMMss').toString() + path.extname(file.originalname));
//         cb(null, dateFormat('yyyymmddHHMMss').toString() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

router.get('/:houseAdsID', houseImageController.getOneHouseImage);
//router.post('/create', upload.single('small'), houseImageController.createHouseImage);
router.post('/create', houseImageController.createHouseImage);
router.delete('/delete/:houseAdsID', houseImageController.deleteHouseImage);

module.exports = router;