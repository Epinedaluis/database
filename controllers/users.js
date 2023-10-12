 const{request,response} = require('express'); 
 const usersModel = require('../models/users')
const pool = require('../db');
 const listUsers = async (req = request ,res = response) => {
    let conn;

    try {
        conn = await pool.getConnection();

        const user = await conn.query(usersModel.getAll, (err) =>{
            if (err){
                throw err;
            }
        })

        res.json (user);

    } catch (error) {
        console.log(error);
        res.status(500).jason(error);
    } finally {
        if(conn){
            conn.end
        }
    }



}

module.exports = listUsers