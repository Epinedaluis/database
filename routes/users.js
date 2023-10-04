const express = require('express')
const router = express.Router()
const listUser = require('../controllers/Users')


router.get('/', (req,res) => listUser (req,res))

module.exports = router

//http://localhost:3000/api/v1/users