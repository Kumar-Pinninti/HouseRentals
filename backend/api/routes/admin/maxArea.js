const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../../middleware/adminAuth');
const maxAreaController = require('../../controller/admin/maxArea');

router.get('/all', maxAreaController.getAllMaxArea);
router.get('/:maxAreaID', maxAreaController.getOneMaxArea);
router.post('/create', maxAreaController.createMaxArea);
router.patch('/update/:maxAreaID', maxAreaController.updateMaxArea);
router.delete('/delete/:maxAreaID', maxAreaController.deleteMaxArea);

module.exports = router;