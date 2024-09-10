// make a group chat
export default async function createGroupChat(pool,name,description,adminid){
    const query = `INSERT INTO group_chat(uid , name , description, adminid) values  (UUID() , ? ,? , ?) RETURNING *;`

    name = name.toString()
    description = description.toString()
    adminid = adminid.toString()

    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,[name , description , adminid]);
        console.log(rows);  
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.release();
    }

}

// add people into the group
export default async function addGroupParticipant(pool,participantid , group_chat_id){
    const query = `INSERT INTO participant(uid , participantid, group_chat_id) values  (UUID() , ? ,?) RETURNING *;`

    participantid = participantid.toString()
    group_chat_id = group_chat_id.toString()

    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,[participantid,group_chat_id]);
        console.log(rows);  
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.release();
    }

}


//send a message in the group

export default async function sendGroupMessage(pool,sender_id , message_type , content , group_chat_id){
    const query = `INSERT INTO group_chat_message(uid , sender_id , message_type , content, group_chat_id) 
                    values  (UUID() , ? ,? ,?,?) RETURNING *;`

    sender_id = sender_id.toString()
    message_type = message_type.toString()
    content = content.toString()
    group_chat_id = group_chat_id.toString()

    let conn = await pool.getConnection();

    try{
        const rows = await conn.query(query,[sender_id,message_type,content,group_chat_id]);
        console.log(rows);  
    }catch(err){
        console.log(err)
    }finally{
        if(conn)conn.release();
    }
}
