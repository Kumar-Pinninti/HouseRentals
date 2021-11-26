const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../../middleware/adminAuth');
const minAreaController = require('../../controller/admin/minArea');

router.get('/all', minAreaController.getAllMinArea);
router.post('/create', minAreaController.createMinArea);
router.patch('/update/:minAreaID', minAreaController.updateMinArea);
router.delete('/delete/:minAreaID', minAreaController.deleteMinArea);

module.exports = router;