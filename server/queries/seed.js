import mysql from 'mysql2/promise';
import fs from 'fs';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        ca: fs.readFileSync(process.env.DB_SSL_CA_PATH)
    }
});


try {
    // Select the database
    await pool.query(`USE chatapp;`);

    // Create the profile table
    const createProfileTableQuery = `
        CREATE TABLE profile (
            uid varchar(36) PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            ph_number VARCHAR(20) UNIQUE,
            email VARCHAR(100) UNIQUE NOT NULL,
            hashed_password VARCHAR(50) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Execute the query
    await pool.query(createProfileTableQuery);

    console.log('Profile table created successfully.');

    // Create the request table
    const createRequestTableQuery = `
        CREATE TABLE request (
            uid varchar(36) PRIMARY KEY,
            senderid varchar(36),
            receiverid varchar(36),
            accepted BOOLEAN DEFAULT FALSE,
            CONSTRAINT sender_profile FOREIGN KEY (senderid) REFERENCES profile(uid),
            CONSTRAINT receiver_profile FOREIGN KEY (receiverid) REFERENCES profile(uid),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Execute the query
    await pool.query(createRequestTableQuery);

    console.log('Request table created successfully.');

} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}


// Create trigger after_request_accepted
try {
    await pool.query(`USE chatapp;`);

    await pool.query(`DROP TRIGGER IF EXISTS after_request_accepted;`);

    const triggerQuery = `
        CREATE TRIGGER after_request_accepted
        AFTER UPDATE ON request
        FOR EACH ROW
        BEGIN
            IF NEW.accepted = TRUE AND OLD.accepted = FALSE THEN
                INSERT INTO friend_or_chat (uid, user_one, user_two)
                VALUES (UUID(), NEW.senderid, NEW.receiverid);
            END IF;
        END;
    `;

    const [rows, fields] = await pool.query(triggerQuery);

    console.log('Trigger created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

// Create table friend_or_chat
try {
    await pool.query(`USE chatapp;`);

    const query = `
        CREATE TABLE friend_or_chat (
            uid varchar(36) PRIMARY KEY,
            user_one varchar(36),
            user_two varchar(36),
            CONSTRAINT user1_profile FOREIGN KEY (user_one) REFERENCES profile(uid),
            CONSTRAINT user2_profile FOREIGN KEY (user_two) REFERENCES profile(uid),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const [rows, fields] = await pool.query(query);

    console.log('Table created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

// Create table friend_chat_message
try {
    await pool.query(`USE chatapp;`);

    const query = `
        CREATE TABLE friend_chat_message (
            uid varchar(36) PRIMARY KEY,
            sender_id varchar(36),
            receiver_id varchar(36),
            message_type TEXT CHECK (message_type IN ('text', 'image', 'video')),
            content VARCHAR(500),
            chat_id varchar(36),
            CONSTRAINT fk_chat_id FOREIGN KEY (chat_id) REFERENCES friend_or_chat(uid),
            CONSTRAINT fk_sender_profile FOREIGN KEY (sender_id) REFERENCES profile(uid),
            CONSTRAINT fk_receiver_profile FOREIGN KEY (receiver_id) REFERENCES profile(uid),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const [rows, fields] = await pool.query(query);

    console.log('Table created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

// Create table group_chat
try {
    await pool.query(`USE chatapp;`);

    const query = `
        CREATE TABLE group_chat (
            uid varchar(36) PRIMARY KEY,
            name varchar(50),
            imageurl varchar(500),
            description varchar(100),
            adminid varchar(36) NOT NULL,
            pCanSend BOOLEAN DEFAULT TRUE,
            CONSTRAINT admin_profile FOREIGN KEY (adminid) REFERENCES profile(uid),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const [rows, fields] = await pool.query(query);

    console.log('Table created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

// Create table participant
try {
    await pool.query(`USE chatapp;`);

    const query = `
        CREATE TABLE participant (
            uid varchar(36) PRIMARY KEY,
            participantid varchar(36),
            group_chat_id varchar(36),
            CONSTRAINT participant_table_id_to_groupchat FOREIGN KEY (group_chat_id) REFERENCES group_chat(uid),
            CONSTRAINT participant_profile FOREIGN KEY (participantid) REFERENCES profile(uid),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const [rows, fields] = await pool.query(query);

    console.log('Table created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

// Create table group_chat_message
try {
    await pool.query(`USE chatapp;`);

    const query = `
        CREATE TABLE group_chat_message (
            uid varchar(36) PRIMARY KEY,
            sender_id varchar(36),
            message_type TEXT CHECK(message_type IN ('text', 'image', 'video')),
            content VARCHAR(500),
            group_chat_id varchar(36),
            CONSTRAINT groupMessage_to_groupChat FOREIGN KEY (group_chat_id) REFERENCES group_chat(uid),
            CONSTRAINT sender_profile FOREIGN KEY (sender_id) REFERENCES profile(uid),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const [rows, fields] = await pool.query(query);

    console.log('Table created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

// Create trigger after_block_insert
try {
    await pool.query(`USE chatapp;`);

    const query = `
        CREATE TRIGGER after_block_insert
        AFTER INSERT ON blocked_accounts
        FOR EACH ROW
        BEGIN
            DELETE FROM friend_or_chat
            WHERE (user_one = NEW.blocker_id AND user_two = NEW.blocked_id)
               OR (user_one = NEW.blocked_id AND user_two = NEW.blocker_id);
        END;
    `;

    const [rows, fields] = await pool.query(query);

    console.log('Trigger created successfully.');
    console.log("Result:", rows);
    console.log("Fields:", fields);
} catch (e) {
    console.log("Error:", e.message);
    console.log("Error running the query");
}

export default pool;
