import stringifyArray from "../utils/stringify";

async function createProfile(username ,name , ph_number , password, email ,pool){
    const query = `INSERT INTO profile (uid,username ,name , ph_number, hashed_password , email) values (UUID() ,?,?,?,? ?)`;
    let values = [username , name , ph_number , password ,email]
    values = stringifyArray(values)

    // how to make password into hashed password    


    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,values);
        console.log(rows);  
        return rows;
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
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