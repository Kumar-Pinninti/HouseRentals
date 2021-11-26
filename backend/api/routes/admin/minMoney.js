const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../../middleware/adminAuth');
const minMoneyController = require('../../controller/admin/minMoney');

router.get('/all', minMoneyController.getAllMinMoney);
router.post('/create', minMoneyController.createMinMoney);
router.patch('/update/:minMoneyID', minMoneyController.updateMinMoney);
router.delete('/delete/:minMoneyID', minMoneyController.deleteMinMoney);

module.exports = router;