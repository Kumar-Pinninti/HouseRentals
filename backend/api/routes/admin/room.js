const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../../middleware/adminAuth');
const roomController = require('../../controller/admin/room');

router.get('/all', roomController.getAllRoom);
router.post('/create', roomController.createRoom);
router.patch('/update/:roomID', roomController.updateRoom);
router.delete('/delete/:roomID', roomController.deleteRoom);

module.exports = router;