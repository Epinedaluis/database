const express = require('express')
const router = express.Router()
const {listUsers,
    listUserByID,
    addUser,
    deleteUser,
    updateUser,
    signInUser} 
     = require('../controllers/users')


router.get('/',listUsers);
router.get('/:id',listUserByID); // http://localhost:3000/api/v1/user/?
router.post('/', signInUser);
router.put('/',addUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router

//http://localhost:3000/api/v1/users