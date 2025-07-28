const express = require('express')
const { addNewSection, getAllSections, updateSection, getSectionById, deleteSection } = require('../../controllers/private/admin/SectionController')

const router = express.Router()

router.route('/')
    .post(addNewSection)
    .get(getAllSections)

router.route('/:id')
    .post(updateSection)
    .get(getSectionById)
    .delete(deleteSection)


module.exports = router