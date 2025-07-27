const express = require('express')
const { addNewTask, getAllTasks, updateTask, getTaskById, deleteTask } = require('../../controllers/private/admin/taskController')

const router = express.Router()

router.route('/')
.post(addNewTask)
.get(getAllTasks)

router.route('/:id')
.post(updateTask)
.get(getTaskById)
.delete(deleteTask)


module.exports = router