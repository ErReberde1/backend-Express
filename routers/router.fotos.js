const express = require('express')
const router = express.Router()

const {getFotos, postFotos,getAllFotos} = require('../controllers/fotos.controller.js')

router.route('/')
    .get(getAllFotos)
    .post(postFotos)
    

router.route('/:author')
    .get(getFotos)
    .put()
    

module.exports = router