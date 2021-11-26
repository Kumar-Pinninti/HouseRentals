const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../../middleware/adminAuth');
const divisionController = require('../../controller/admin/division');

router.get('/all', divisionController.getAllDivision);
router.post('/create', divisionController.createDivision);
router.patch('/update/:divisionID', divisionController.updateDivision);
router.delete('/delete/:divisionID', divisionController.deleteDivision);

module.exports = router;