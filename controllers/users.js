 const{request,response} = require('express'); 
 const usersModel = require('../models/users')
const pool = require('../db');
 const listUsers = async (req = request ,res = response) => {
    const {id} = req.params;
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

 const listUserByID = async (req = request ,res = response) => {
    const {id} = req.params;
    let conn;

    if(isNaN(id)){
        res.status(400).json({msg: `The ID ${id} Invalid id`});
        return;
    }


    try {
        conn = await pool.getConnection();

        const [user] = await conn.query(usersModel.getByID,[id], (err) =>{
            if (err){
                throw err;
            }
        })

        if(!user){
            res.status(404).json({msg: `User with ID ${id } not found`});
            return;
        }

        res.json (user);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    } finally {
        if(conn){
            conn.end
        }
    }

 }

const addUser = async (req = request, res= response) => {

    const {
        username,
        password,
        email,
        name,
        lastname,
        phonenumber = '',
        role_id,
        is_active = 1
    } = req.body;

    if(!username || !password || !email || !name || !lastname || !role_id){
        res.status(400).json({msg: 'Missing information'});
        return;
    }

    const user = [username, password, email, name, lastname, phonenumber, role_id, is_active]

    let conn;

    try{
        conn = await pool.getConnection();

        const [usernameExists] = await conn.query(usersModel.getByUsername, [username],(err) =>{
            if (err) throw err;
        })

        if(usernameExists){
            res.status(409).json({msg: `Username ${username} already exists`});
            return;
        }

        const [EmailExists] = await conn.query (usersModel.getByEmail, [email], (err) => {
            if (err) throw err;
        })

        if(EmailExists){
            res.status(409).json({msg: `Email ${email}  already exists`});
            return;
        }

        const userAdded = await conn.query(usersModel.addRow, [...user], (err) => {
            if (err) throw err;
        })

        if (userAdded.affectedRows == 0){
            throw new Error('User not added')
        }
        
        res.json({msg: 'User added succesfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);

    } finally {
        if(conn) conn.end();
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud
    const {
      username,
      password,
      email,
      name,
      lastname,
      phonenumber,
      role_id,
      is_active,
    } = req.body;
  
    if (!userId) {
      res.status(400).json({ msg: 'User ID is required' });
      return;
    }
  
    // Validar si el usuario existe en la base de datos antes de actualizarlo
    const conn = await pool.getConnection();
  
    try {
      const [existingUser] = await conn.query('SELECT * FROM users WHERE id = ?', [userId]);
  
      if (existingUser.length === 0) {
        res.status(404).json({ msg: 'User not found' });
        return;
      }
  
      // Construir un objeto con las propiedades que se desean actualizar
      const updatedUser = {
        username,
        password,
        email,
        name,
        lastname,
        phonenumber,
        role_id,
        is_active,
      };
  
      // Eliminar propiedades indefinidas o nulas para evitar que se sobrescriban con valores vacíos
      for (const key in updatedUser) {
        if (updatedUser[key] === undefined) {
          delete updatedUser[key];
        }
      }
  
      if (Object.keys(updatedUser).length === 0) {
        res.status(400).json({ msg: 'No valid update fields provided' });
        return;
      }
  
      // Actualizar el usuario en la base de datos
      await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId]);
      res.json({ msg: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    } finally {
      if (conn) conn.end();
    }
  };

const deleteUser = async (req, res) => {
    let conn;
    const { id } = req.params;
  
    try {
      conn = await pool.getConnection();
      const [userExist] = await conn.query(usersModel.getByID, [id]);
  
      if (!userExist || userExist[0].is_active === 0) {
        res.status(404).json({ msg: `User with ID ${id} not found` });
        return; // Agregado para evitar que el código continúe ejecutándose
      }
  
      const [userDeleted] = await conn.query(usersModel.deleteRow, [id]);
  
      if (userDeleted.affectedRows === 0) {
        throw new Error('User not deleted');
      }
  
      res.json({ msg: 'User Deleted Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    } finally {
      if (conn) {
        conn.release(); // Usar conn.release() en lugar de conn.end() para liberar la conexión
      }
    }
  };
  


module.exports = {listUsers, listUserByID, addUser,deleteUser,updateUser}

//Solo para creacion de endpoint --- routes    ---   Controllers  ---  Models (DB)
// PARAMS LINK CON VALORES
//QUERI SIGNOS NOMBRE Y VALOR EN LINK
// BODY MANEJAR INFORMACION SENSIBLE