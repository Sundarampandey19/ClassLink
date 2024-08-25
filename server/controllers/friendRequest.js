//function to send an actual friend request

export default async function sendRequest(pool, senderid , receiverid){
    const query = `INSERT INTO request (uid, senderid, receiverid) values (UUID() , ? , ?) returning *`;

    senderid = senderid.toString()
    receiverid = receiverid.toString()
    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,[senderid,receiverid]);
        console.log(rows);  
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
    
}

//lists all the request for a account

export default async function listRequest(pool,  receiverid){
    const query = `SELECT * FROM request WHERE receiverid = ?`;

    receiverid = receiverid.toString()
    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,receiverid);
        console.log(rows);  
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
    
}


// function to accept a friend request
export default async function acceptRequest(pool,  uid ){ 
    
    // takes the uid of request which you can get by doing a simple listrequest query
    const query = `UPDATE request SET accepted = TRUE WHERE uid=?   `;
    const selectQuery = `SELECT * FROM request WHERE uid = ?`;

    uid = uid.toString()
    let conn = await pool.getConnection();

    try{
        let rows = await conn.query(query,uid);
        console.log(rows);  
        rows = await conn.query(selectQuery,uid)
        console.log(rows)
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
    
}

//function to list all the users who are now friends

export default async function listFriend(pool , user_one){ 
    const query = `SELECT * FROM friend_or_chat WHERE user_one = ? OR user_two=?`;
    user_one = user_one.toString()
    let conn = await pool.getConnection();
    try{
        let rows = await conn.query(query,[user_one, user_one]);
        console.log(rows);  
        
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
    
}

