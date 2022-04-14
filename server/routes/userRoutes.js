const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authUser = userController.authUser;
const getUserProfile = userController.getUserProfile;
const authMiddleware = require('../middleware/authMiddleware');
const protect = authMiddleware.protect;

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
