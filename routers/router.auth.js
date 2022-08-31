const express = require('express');
const router = express.Router();

const {signIn} = require('../controllers/auth.controller.js')

router.route('/')
    .post(signIn)


module.exports = router
