const express = require('express')
const router = express.Router()

const {getFotos, postFotos} = require('../controllers/fotos.controller.js')

router.route('/')
    .get()
    .post(postFotos)
    

router.route('/:author')
    .get(getFotos)
    .put()
    

module.exports = router