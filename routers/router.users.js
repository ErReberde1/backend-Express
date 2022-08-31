const express = require('express')
const router = express.Router()

const {postUser,updateUser, getUser1} = require('../controllers/user.controller.js')


router.route("/")
    .get()
    .post(postUser)


router.route('/:id')
    .put(updateUser)
    .get(getUser1)


module.exports = router