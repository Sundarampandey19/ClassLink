    //send individual message to a friend
    import pool from "../connections/db.js";

export default async function sendMessage( sender_id , receiver_id , message_type , content, chat_id){ 
    const query =`insert into friend_chat_message (uid , sender_id , receiver_id , message_type , content, chat_id)
                    values  (UUID() , ?,?,?,?,?);`

    
    sender_id = sender_id.toString()
    receiver_id = receiver_id.toString()
    message_type = message_type.toString()
    content = content.toString()
    chat_id = chat_id.toString()

    let conn = await pool.getConnection();
    try{
        let [rows] = await conn.query(query,[sender_id, receiver_id, message_type, content, chat_id]);
        console.log(rows);  
        return rows 
    }catch(err){
        console.log(err) 
    }finally{
        if(conn)conn.release();
    }
    
}