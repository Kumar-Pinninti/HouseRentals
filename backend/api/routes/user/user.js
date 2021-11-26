const express = require('express');
const router = express.Router();
const checkUserAuth = require('../../middleware/userAuth');
const userController = require('../../controller/user/user');

router.get('/all', userController.getAllUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:userID', userController.getOneUser, checkUserAuth);
router.patch('/update/:userID', userController.updateUser, checkUserAuth);
router.delete('/delete/:userID', userController.deleteUser, checkUserAuth);

module.exports = router;