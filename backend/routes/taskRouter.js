const express = require('express')
const router = express.Router()
const taskController = require('../controller/taskController')
const authController = require('../controller/authController')
const userController = require('../controller/userController')
router.post('/addtask', authController.protect, taskController.createTask)
router.get('/getalltask', authController.protect, taskController.getAlltasks)
router.patch('/updatetask/:taskid', authController.protect, taskController.updateTask)
router.delete('/deletetask/:taskid', authController.protect, taskController.deleteTask)
router.get('/alltaskstatus', authController.protect, taskController.getTaskStatus)
router.patch('/updatetaskstatus/:taskid', authController.protect, userController.getUpdateMyTaskStatus)
router.get('/mytaskstatus', authController.protect, userController.getMyTaskStatus)

module.exports = router