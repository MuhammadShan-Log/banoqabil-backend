const express = require('express')
const { addNewProject, getAllProjects, updateProject, getProjectById, deleteProject } = require('../../controllers/private/admin/projectController')


const router = express.Router()

router.route('/')
    .post(addNewProject)
    .get(getAllProjects)

router.route('/:id')
    .post(updateProject)
    .get(getProjectById)
    .delete(deleteProject)


module.exports = router