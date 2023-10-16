const usersModel = {
  getAll: `
    SELECT
    *
    FROM 
    Users 

    `,
    getByID: `
    SELECT
    *
    FROM
    Users
    WHERE
    id = ?
    `,
    getByUsername: `
    SELECT
    *
    FROM
    Users
    WHERE
    username= ?
    `,
    getByEmail: `
    SELECT
    *
    FROM
    Users
    WHERE
    email = ?
    `,

    addRow: `
    INSERT INTO
    Users(
      username,
      password,
      email,
      name,
      lastname,
      phonenumber,
      role_id,
      is_active
    ) VALUES(
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )
    `,
};



module.exports = usersModel;
