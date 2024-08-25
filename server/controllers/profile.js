import stringifyArray from "../utils/stringify.js";
import pool from "../db.js";

async function createProfile(username ,name , ph_number , hashed_password, email ){
    const query = `INSERT INTO profile (uid,username ,name , ph_number, hashed_password , email) values (UUID() ,?,?,?,?,?) returning *;`
    let values = [username , name , ph_number , hashed_password ,email]        

    try {
        const result= await pool.query(query, values);
        console.log(result);
        return result;
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            // Parse the error message to find which field caused the issue
            if (err.sqlMessage.includes('for key \'username\'')) {
                throw new Error('Duplicate username');
            } else if (err.sqlMessage.includes('for key \'ph_number\'')) {
                throw new Error('Duplicate phone number');
            } else if (err.sqlMessage.includes('for key \'email\'')) {
                throw new Error('Duplicate email');
            }
        }
        console.error('Error executing query:', err);
        throw err;
    } 

}

//  lists all the people you can add as friend

 async function listUsers(pool , profileid){
    const query = `SELECT * FROM profile WHERE uid != ?`;

    profileid = profileid.toString()
    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,[profileid]);
        console.log(rows);  
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }

}

export { createProfile , listUsers }