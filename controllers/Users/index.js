 const{request,response} = require('express'); 
 const listUsers = (req = request ,res = response) => {
    res.json ({msg: 'Users'})
}

module.exports = listUsers