const express = require('express')
const authController = require('../controller/authController')
const userController = require('../controller/userController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/getmytasks', authController.protect, userController.getMyAllTask)
router.get('/alluser', authController.protect, userController.getAllUsers)
module.exports = router