const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.json ({msg: 'user'})
})

module.exports = router

//htts://localhost:3000/api/v1/users