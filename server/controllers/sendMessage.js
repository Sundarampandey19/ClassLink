    //send individual message to a friend
    import pool from "../connections/db.js";

export default async function sendMessage( sender_id , receiver_id , message_type , content, chat_id){ 
    const query = `
    INSERT INTO friend_chat_message (uid, sender_id, receiver_id, message_type, content, chat_id)
    VALUES (UUID(), ?, ?, ?, ?, ?);
  `;

  const selectQuery = `
  SELECT * FROM friend_chat_message
  WHERE uid = (SELECT uid FROM friend_chat_message ORDER BY created_at DESC LIMIT 1);
`;

    
    sender_id = sender_id.toString()
    receiver_id = receiver_id.toString()
    message_type = message_type.toString()
    content = content.toString()
    chat_id = chat_id.toString()

    let conn = await pool.getConnection();
    try{
        await conn.query(query,[sender_id, receiver_id, message_type, content, chat_id]);
        const [rows] = await conn.query(selectQuery);
        return rows 
    }catch(err){
        console.log(err) 
    }finally{
        if(conn)conn.release();
    }
    
}