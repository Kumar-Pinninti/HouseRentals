const express = require('express');
const router = express.Router();
const checkUserAuth = require('../../middleware/userAuth');
const houseAdsController = require('../../controller/user/houseAds');
// const multer = require('multer');
// const dateFormat = require('dateformat');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/image');
//     },
//     filename: function(req, file, cb) {
//         cb(null, dateFormat('yyyymmddHHMMss').toString() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

router.get('/all', houseAdsController.getAllHouseAds);
router.post('/search', houseAdsController.getSearchAds);
router.post('/create', houseAdsController.createHouseAds);
router.get('/:houseAdsID', houseAdsController.getOneHouseAds);
router.get('/user/:houseAdsID', houseAdsController.getUserHouseAds);
//router.patch('/update/:houseAdsID', upload.single('picture'), houseAdsController.updateHouseAds);
router.patch('/update/:houseAdsID',  houseAdsController.updateHouseAds);
router.delete('/delete/:houseAdsID', houseAdsController.deleteHouseAds);

module.exports = router;