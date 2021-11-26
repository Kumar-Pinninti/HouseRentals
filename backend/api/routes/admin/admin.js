const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../../middleware/adminAuth');
const adminController = require('../../controller/admin/admin');

router.get('/all', adminController.getAllAdmin);
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/:adminID', adminController.getOneAdmin);
router.patch('/update/:adminID', adminController.updateAdmin);
router.delete('/delete/:adminID', adminController.deleteAdmin);

module.exports = router;