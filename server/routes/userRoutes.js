const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authUser = userController.authUser;
const getUserProfile = userController.getUserProfile;
const registerUser = userController.registerUser;
const authMiddleware = require('../middleware/authMiddleware');
const protect = authMiddleware.protect;
const admin = authMiddleware.admin;
const getUsers = userController.getUsers;
const updateUserProfile = userController.updateUserProfile;

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
