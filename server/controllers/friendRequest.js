//function to send an actual friend request
import pool from "../db.js";

export  async function sendRequest( senderid , receiverid){
    const query = `INSERT INTO request (uid, senderid, receiverid) values (UUID() , ? , ?) returning *`;

    senderid = senderid.toString()
    receiverid = receiverid.toString()
    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,[senderid,receiverid]);
        // console.log(rows);  
        return rows
    }catch(err){
        console.log(err)
        if (err.code === 'ER_DUP_ENTRY') {
            // Parse the error message to find which field caused the issue
             if (err.sqlMessage.includes('for key \'unique_sender_receiver\'')) {
                throw new Error('Duplicate request');                       
            }
        }
    }finally{
        if(conn)conn.end();
    }
    
}

//lists all the request for a account

export  async function listRequest(receiverid){
    const query = `SELECT r.uid, 
            r.senderid, 
            u.name AS senderName, 
            r.receiverid, 
            r.accepted, 
            r.created_at 
        FROM 
            request r
        JOIN 
            profile u ON r.senderid = u.uid
        WHERE 
            r.receiverid = ?
            AND accepted = false`;

    receiverid = receiverid.toString()
    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,receiverid);
        // console.log(rows);  
        return rows
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
}

export  async function sentRequest(senderid){
    const query = `SELECT * FROM request WHERE senderid = ? AND accepted = false`;

    senderid = String(senderid)
    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,senderid);
        // console.log(rows);  
        return rows
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
}


// function to accept a friend request
export  async function acceptRequest( uid ){ 
    
    // takes the uid of request which you can get by doing a simple listrequest query
    const query = `UPDATE request SET accepted = TRUE WHERE uid=?   `;
    // const selectQuery = `SELECT * FROM request WHERE uid = ?`;

    uid = uid.toString()
    let conn = await pool.getConnection();

    try{
        let rows = await conn.query(query,uid);
        console.log(rows);  
        // rows = await conn.query(selectQuery,uid)    
        console.log(rows)
        return rows
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
    
}

//function to list all the users who are now friends

export  async function listFriend( user_one){ 
    const query = `SELECT 
            CASE 
                WHEN fc.user_one = ? THEN p2.uid 
                ELSE p1.uid 
            END AS user_id,
            CASE 
                WHEN fc.user_one = ? THEN p2.name 
                ELSE p1.name 
            END AS name,
            CASE 
                WHEN fc.user_one = ? THEN p2.email 
                ELSE p1.email 
            END AS email
        FROM friend_or_chat fc
        LEFT JOIN profile p1 ON fc.user_one = p1.uid
        LEFT JOIN profile p2 ON fc.user_two = p2.uid
        WHERE fc.user_one = ? OR fc.user_two = ?`;
    user_one = user_one.toString()
    let conn = await pool.getConnection();
    try{
        let rows = await conn.query(query,[user_one, user_one ,user_one,user_one,user_one           ]);
        return rows
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.end();
    }
    
}

// export {sendRequest ,listRequest ,acceptRequest,listFriend}
