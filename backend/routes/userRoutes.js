const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middlewares/authUser');

//1. Get All
router.get('/all', userController.getAllUsers);

//2. Sign Up
router.post('/register', userController.createUser);

//3. Sign In
router.post('/login', auth.authUser);

//4. Get User Profile After Sign In
router.get('/profile', auth.protect, userController.getUserProfile);

//5. Update User
router.put('/update/:userId', userController.updateUser);

//6. Delete User
// router.delete('/delete/:userId',auth.protect, auth.superAdmin, userController.deleteUser);
router.delete('/delete/:userId', userController.deleteUser);

 
module.exports = router;